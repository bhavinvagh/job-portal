const express = require("express");
const UserRouter = express.Router();

// Controllers
const UserController = require("../Controller/UserController");

const {
    checkRegisterInput,
    checkLoginInput,
    checkUserUpdateInput,
} = require("../Validation/UserDataRules");

const {
    inputValidationMiddleware,
} = require("../Validation/ValidationMiddleware");
const {
    userAuthorizationHandler,
} = require("./../Middleware/UserAuthorizationMiddleware");

// userAuthorizationHandler("admin"),
// Routes
UserRouter.route("/")
    .get(userAuthorizationHandler("admin"), UserController.getAllUser)
    .patch(UserController.updateUser)
    .delete(UserController.deleteAllUser);

UserRouter.route("/:id")
    .get(UserController.getSingleUser)
    .delete(userAuthorizationHandler("admin"), UserController.deleteUser);

module.exports = UserRouter;

// Extra----------------------------
// UserRouter.get("/", JobController.getAllJobs); //Get all jobs
// UserRouter.post("/", JobController.addJob); //Add all jobs
// UserRouter.get("/:id", JobController.getSingleJob); //Get Single all jobs
