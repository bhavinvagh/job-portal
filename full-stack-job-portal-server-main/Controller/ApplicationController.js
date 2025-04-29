const ApplicationModel = require("../Model/ApplicationModel");
const mongoose = require("mongoose");
const createError = require("http-errors");

const day = require("dayjs");

exports.testing = async (req, res, next) => {
    try {
        res.status(200).json({
            status: "Ok",
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

module.exports.getCandidateAppliedJobs = async (req, res, next) => {
    try {
        const filters = { ...req.query, applicantId: req.user._id }; // to make a copy so that original don't moidfied
        console.log(filters);
        // exclude
        const excludeFields = ["sort", "page", "limit", "fields", "search"];
        excludeFields.forEach((field) => delete filters[field]);

        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
        }
        if (req.query.limit) {
            const limit = req.query.limit.split(",").join(" ");
            queries.limit = limit;
        }

        if (req.query.page) {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 5);
            const skip = (page - 1) * limit;

            queries.skip = skip;
            queries.limit = limit;
            queries.page = page;
        }

        const { result, totalJobs, pageCount, page } = await getData(
            filters,
            queries
        );

        // response
        if (result.length !== 0) {
            res.status(200).json({
                status: true,
                result,
                totalJobs,
                currentPage: page,
                pageCount: pageCount || 1,
            });
        } else {
            next(createError(500, "Job List is empty"));
        }
    } catch (error) {
        next(createError(500, error.message));
    }
};

const getData = async (filters, queries) => {
    let sortCriteria = {};

    if (queries.sortBy) {
        switch (queries.sortBy) {
            case "newest":
                sortCriteria = { createdAt: -1 };
                break;
            case "oldest":
                sortCriteria = { createdAt: 1 };
                break;
            case "a-z":
                sortCriteria = { position: 1 };
                break;
            case "z-a":
                sortCriteria = { position: -1 };
                break;
            default:
                // Default sorting criteria if none of the options match
                sortCriteria = { createdAt: -1 };
                break;
        }
    } else {
        // Default sorting criteria if sortBy parameter is not provided
        sortCriteria = { createdAt: -1 };
    }
    const result = await ApplicationModel.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .sort(sortCriteria)
        .select(queries.fields)
        .populate("jobId");

    // it not depend on previous one, its document number will be based on filter passing here
    const totalJobs = await ApplicationModel.countDocuments(filters);
    const pageCount = Math.ceil(totalJobs / queries.limit);
    return { result, totalJobs, pageCount, page: queries.page };
};

module.exports.getRecruiterPostJobs = async (req, res, next) => {
    const filter = { recruiterId: req.user._id };
    try {
        const result = await ApplicationModel.find(filter).populate("jobId");
        const totalJobs = await ApplicationModel.countDocuments(filter);
        // response
        if (result.length !== 0) {
            res.status(200).json({
                status: true,
                totalJobs,
                result,
            });
        } else {
            next(createError(500, "No Job Found"));
        }
    } catch (error) {
        next(createError(500, error.message));
    }
};

exports.applyInJob = async (req, res, next) => {
    try {
        const alreadyApplied = await ApplicationModel.findOne({
            applicantId: req.body.applicantId,
            jobId: req.body.jobId,
        });

        if (alreadyApplied) {
            next(createError(500, "Already Applied"));
        } else {
            const applied = new ApplicationModel(req.body);
            const result = await applied.save();
            res.status(201).json({
                status: true,
                message: "Applied Successfully",
            });
        }
    } catch (error) {
        next(createError(500, error.message));
    }
};

module.exports.updateJobStatus = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    try {
        if (data?.recruiterId?.toString() === req?.user._id.toString()) {
            console.log("same");
            if (!mongoose.Types.ObjectId.isValid(id)) {
                next(createError(400, "Invalid Job ID format"));
            }

            const isJobExists = await ApplicationModel.findOne({ _id: id });
            if (!isJobExists) {
                next(createError(500, "Job not found"));
            } else {
                const updatedJob = await ApplicationModel.findByIdAndUpdate(
                    id,
                    { $set: data },
                    {
                        new: true,
                    }
                );
                res.status(200).json({
                    status: true,
                    message: "Job Updated",
                    result: updatedJob,
                });
            }
        } else {
            next(createError(400, "Unauthorized user to update job"));
        }
    } catch (error) {
        next(createError(500, `something wrong: ${error.message}`));
    }
};
