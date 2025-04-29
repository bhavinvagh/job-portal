const { check } = require("express-validator");
const { STATUS } = require("../Utils/ApplicationConstants");
const mongoose = require("mongoose");

exports.checkInput = [
    check("applicantId")
        .trim()
        .notEmpty()
        .withMessage("Application must have an Applicant ID")
        .custom(async (applicationId, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(applicationId)) {
                throw new Error("Invalid Application ID");
            }
        }),
    check("recruiterId")
        .trim()
        .notEmpty()
        .withMessage("Application must have an Recruiter ID")
        .custom(async (recruiterId, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
                throw new Error("Invalid Recruiter ID");
            }
        }),
    check("jobId")
        .trim()
        .notEmpty()
        .withMessage("Application must have an Job ID")
        .custom(async (jobId, { req }) => {
            if (!mongoose.Types.ObjectId.isValid(jobId)) {
                throw new Error("Invalid Job ID");
            }
        }),
    check("status")
        .isIn(Object.values(STATUS))
        .withMessage("Invalid job status"),
    check("dateOfApplication")
        .notEmpty()
        .withMessage("Application Date is required")
        .isDate()
        .withMessage("Invalid date format. Please provide a valid date."),
    check("resume")
        .notEmpty()
        .withMessage("Applicant's Resume is required")
        .isURL()
        .withMessage("Invalid URL. Please provide a valid URL."),
];
