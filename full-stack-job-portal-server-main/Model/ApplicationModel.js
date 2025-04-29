const mongoose = require("mongoose");
const { STATUS } = require("../Utils/ApplicationConstants");

const ApplicationSchema = new mongoose.Schema(
    {
        applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        recruiterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(STATUS),
            default: STATUS.PENDING,
            required: true,
        },
        resume: {
            type: String,
            required: true,
        },
        dateOfApplication: {
            type: Date,
            default: Date.now,
        },
        dateOfJoining: {
            type: Date,
            validate: [
                {
                    validator: function (value) {
                        return this.dateOfApplication <= value;
                    },
                    message:
                        "dateOfJoining should be greater than dateOfApplication",
                },
            ],
        },
    },
    { timestamps: true }
);

const ApplicationModel = mongoose.model("application", ApplicationSchema);
module.exports = ApplicationModel;
