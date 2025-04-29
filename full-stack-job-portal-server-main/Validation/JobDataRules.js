const { check } = require("express-validator");
const { JOB_TYPE, JOB_STATUS } = require("../Utils/JobConstants");

exports.checkJobInput = [
    check("company").trim().notEmpty().withMessage("Job must have a Company"),
    check("position").trim().notEmpty().withMessage("Job must have a Position"),
    check("jobLocation")
        .trim()
        .notEmpty()
        .withMessage("Job location is required"),
    check("jobStatus")
        .isIn(Object.values(JOB_STATUS))
        .withMessage("Invalid job status"),
    check("jobType")
        .isIn(Object.values(JOB_TYPE))
        .withMessage("Invalid job type"),
    check("jobVacancy")
        .trim()
        .notEmpty()
        .withMessage("Job Vacancy is requried"),
    check("jobSalary").trim().notEmpty().withMessage("Job Salary is requried"),
    check("jobDeadline")
        .trim()
        .notEmpty()
        .withMessage("Job Deadline is requried"),
    check("jobDescription")
        .trim()
        .notEmpty()
        .withMessage("Job Description is requried"),
    check("jobSkills").isArray({ min: 1 }).withMessage("Job Skills is requrie"),
    check("jobFacilities")
        .isArray({ min: 1 })
        .withMessage("Job Facilities is requrie"),
    check("jobContact")
        .trim()
        .notEmpty()
        .withMessage("Job contact is requried"),
];
