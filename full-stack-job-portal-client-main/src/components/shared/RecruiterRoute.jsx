import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Loading from "./Loading";

const RecruiterRoute = ({ children }) => {
    const location = useLocation();
    const { userLoading, user } = useUserContext();

    if (userLoading) {
        return <Loading />;
    }

    if (user?.email && user?.role === "recruiter") {
        return children;
    }
    return <Navigate to="/" />;
};

export default RecruiterRoute;
