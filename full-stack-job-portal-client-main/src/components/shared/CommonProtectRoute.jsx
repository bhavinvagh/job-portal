import React from "react";
import { useUserContext } from "../../context/UserContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

const CommonProtectRoute = ({ children }) => {
    const location = useLocation();
    const { userLoading, user } = useUserContext();

    if (userLoading) {
        return <Loading />;
    }

    if (user?.email) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default CommonProtectRoute;
