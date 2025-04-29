const express = require("express");
const JobRouter = express.Router(); // create a router

// Controllers
const JobController = require("../Controller/JobController");
const { checkJobInput } = require("../Validation/JobDataRules");
const {
    inputValidationMiddleware,
} = require("../Validation/ValidationMiddleware");

const {
    userAuthorizationHandler,
} = require("./../Middleware/UserAuthorizationMiddleware");

// Routes
JobRouter.route("/")
    .get(JobController.getAllJobs)
    .post(
        userAuthorizationHandler("recruiter"),
        checkJobInput,
        inputValidationMiddleware,
        JobController.addJob
    )
    .delete(JobController.deleteAllJobs);

JobRouter.get("/my-jobs", JobController.getMyJobs);
JobRouter.route("/:id")
    .get(JobController.getSingleJob)
    .patch(
        userAuthorizationHandler("recruiter"),
        checkJobInput,
        inputValidationMiddleware,
        JobController.updateSingleJob
    )
    .delete(
        userAuthorizationHandler("recruiter"),
        JobController.deleteSingleJob
    );

module.exports = JobRouter;

// Extra----------------------------
// JobRouter.get("/", JobController.getAllJobs); //Get all jobs
// JobRouter.post("/", JobController.addJob); //Add all jobs
// JobRouter.get("/:id", JobController.getSingleJob); //Get Single all jobs
