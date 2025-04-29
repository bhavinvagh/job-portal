const express = require("express");
const AdminRouter = express.Router(); // create a router

const {
    userAuthorizationHandler,
} = require("./../Middleware/UserAuthorizationMiddleware");
const {
    authenticateUser,
} = require("./../Middleware/UserAuthenticationMiddleware");

// Controllers
const AdminController = require("../Controller/AdminController");

// Authentication routes
AdminRouter.get(
    "/info",
    userAuthorizationHandler("admin"),
    AdminController.getAllInfo
);
AdminRouter.get(
    "/stats",
    userAuthorizationHandler("admin"),
    AdminController.monthlyInfo
);
AdminRouter.patch(
    "/update-role",
    userAuthorizationHandler("admin"),
    AdminController.updateUserRole
);
module.exports = AdminRouter;
