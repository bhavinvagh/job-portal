const UserModel = require("../Model/UserModel");
const JobModel = require("../Model/JobModel");
const mongoose = require("mongoose");

const createError = require("http-errors");

const day = require("dayjs");

exports.getAllInfo = async (req, res, next) => {
    try {
        const users = await UserModel.find({});
        const admin = await UserModel.find({ role: "admin" });
        const recruiter = await UserModel.find({ role: "recruiter" });
        const applicant = await UserModel.find({ role: "user" });

        const jobs = await JobModel.find({});

        const interviewJobs = await JobModel.find({ jobStatus: "interview" });
        const pendingJobs = await JobModel.find({ jobStatus: "pending" });
        const declinedJobs = await JobModel.find({ jobStatus: "declined" });

        res.status(200).json({
            user: users?.length || 0,
            admin: admin?.length || 0,
            recruiter: recruiter?.length || 0,
            applicant: applicant?.length || 0,
            job: jobs?.length || 0,
            interview: interviewJobs?.length || 0,
            pending: pendingJobs?.length || 0,
            declined: declinedJobs?.length || 0,
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

exports.monthlyInfo = async (req, res, next) => {
    // let stats = await JobModel.aggregate([
    //     { $match: { createdBy: new mongoose.Types.ObjectId(req.user._id) } },
    //     { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
    // ]);
    let stats = await JobModel.aggregate([
        { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, current) => {
        const { _id: title, count } = current;
        acc[title] = count;
        return acc;
    }, {});

    const defaultStats = [
        { name: "pending", value: stats.pending || 0 },
        { name: "interview", value: stats.interview || 0 },
        { name: "declined", value: stats.declined || 0 },
    ];

    // monthly
    // let monthly_stats = await JobModel.aggregate([
    //     { $match: { createdBy: new mongoose.Types.ObjectId(req.user._id) } },
    //     {
    //         $group: {
    //             _id: {
    //                 year: { $year: "$createdAt" },
    //                 month: { $month: "$createdAt" },
    //             },
    //             count: { $sum: 1 },
    //         },
    //     },
    //     { $sort: { "_id:year": -1, "_id.month": -1 } },
    //     { $limit: 6 }, // how many return(last six month's value will return)
    // ]);

    let monthly_stats = await JobModel.aggregate([
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { "_id:year": -1, "_id.month": -1 } },
        { $limit: 6 }, // how many return(last six month's value will return)
    ]);

    monthly_stats = monthly_stats
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;
            const date = day()
                .month(month - 1)
                .year(year)
                .format("MMM YY");
            return { date, count };
        })
        .reverse(); // reverse: to get latest 6 ones

    res.status(200).json({ defaultStats, monthly_stats });
};

exports.updateUserRole = async (req, res, next) => {
    const { id, role } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            next(createError(400, "Invalid User ID format"));
        } else {
            if (req?.user?.role !== "admin") {
                next(createError(500, `You have no permission to update`));
            } else {
                const updateUser = await UserModel.findByIdAndUpdate(
                    { _id: id },
                    { $set: { role: role } },
                    {
                        new: true,
                    }
                );
                res.status(200).json({
                    status: true,
                    message: "Role Updated",
                });
            }
        }
    } catch (error) {
        next(createError(500, `Something went wrong: ${error.message}`));
    }
};
