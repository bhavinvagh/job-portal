const express = require("express");
const AuthRouter = express.Router(); // create a router
const {
    authenticateUser,
} = require("./../Middleware/UserAuthenticationMiddleware");

// Controllers
const UserController = require("../Controller/UserController");

const {
    checkRegisterInput,
    checkLoginInput,
} = require("../Validation/UserDataRules");

const {
    inputValidationMiddleware,
} = require("../Validation/ValidationMiddleware");

// Authentication routes
AuthRouter.post("/logout", authenticateUser, UserController.logOut);
AuthRouter.get("/me", authenticateUser, UserController.getMe);

AuthRouter.post(
    "/register",
    checkRegisterInput,
    inputValidationMiddleware,
    UserController.addUser
);
AuthRouter.post(
    "/login",
    checkLoginInput,
    inputValidationMiddleware,
    UserController.loginUser
);

module.exports = AuthRouter;
