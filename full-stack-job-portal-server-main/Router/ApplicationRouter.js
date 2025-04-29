const express = require("express");
const ApplicationRouter = express.Router();

const {
    authenticateUser,
} = require("./../Middleware/UserAuthenticationMiddleware");

// Controllers
const ApplicationController = require("../Controller/ApplicationController");

// Middlewares
const { checkInput } = require("../Validation/ApplicationDataRules");
const {
    inputValidationMiddleware,
} = require("../Validation/ValidationMiddleware");
const {
    userAuthorizationHandler,
} = require("./../Middleware/UserAuthorizationMiddleware");

// Authentication routes

ApplicationRouter.get(
    "/applicant-jobs",
    userAuthorizationHandler("user"),
    ApplicationController.getCandidateAppliedJobs
);

ApplicationRouter.post(
    "/apply",
    checkInput,
    inputValidationMiddleware,
    userAuthorizationHandler("user"),
    ApplicationController.applyInJob
);

ApplicationRouter.get(
    "/recruiter-jobs",
    userAuthorizationHandler("recruiter"),
    ApplicationController.getRecruiterPostJobs
);

ApplicationRouter.patch(
    "/:id",
    userAuthorizationHandler("recruiter"),
    ApplicationController.updateJobStatus
);

module.exports = ApplicationRouter;
