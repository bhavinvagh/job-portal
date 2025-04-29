import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Loading from "./Loading";

const ProtectAdminRoute = ({ children }) => {
    const location = useLocation();
    const { userLoading, user } = useUserContext();

    if (userLoading) {
        return <Loading />;
    }

    if (user?.email && user?.role === "admin") {
        return children;
    }
    return <Navigate to="/" />;
};

export default ProtectAdminRoute;
