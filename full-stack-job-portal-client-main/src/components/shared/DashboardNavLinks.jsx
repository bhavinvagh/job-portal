
import {
    AdminLinks,
    UserLinks,
    RecruiterLinks,
} from "../../utils/DashboardNavLinkData";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const DashboardNavLinks = () => {
    const { user } = useUserContext();

    if (user?.role === "admin") {
        return (
            <div className="nav-links">
                {AdminLinks?.map((link) => {
                    const { text, path, icon } = link;
                    if (path === "admin" && user?.role !== "admin") {
                        return;
                    }
                    return (
                        <NavLink to={path} key={text} className="nav-link" end>
                            <span className="icon">{icon}</span>
                            {text}
                        </NavLink>
                    );
                })}
            </div>
        );
    }
    if (user?.role === "recruiter") {
        return (
            <div className="nav-links">
                {RecruiterLinks?.map((link) => {
                    const { text, path, icon } = link;
                    if (path === "admin" && user?.role !== "admin") {
                        return;
                    }
                    return (
                        <NavLink to={path} key={text} className="nav-link" end>
                            <span className="icon">{icon}</span>
                            {text}
                        </NavLink>
                    );
                })}
            </div>
        );
    }
    return (
        <div className="nav-links">
            {UserLinks?.map((link) => {
                const { text, path, icon } = link;
                if (path === "admin" && user?.role !== "admin") {
                    return;
                }
                return (
                    <NavLink to={path} key={text} className="nav-link" end>
                        <span className="icon">{icon}</span>
                        {text}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default DashboardNavLinks;
