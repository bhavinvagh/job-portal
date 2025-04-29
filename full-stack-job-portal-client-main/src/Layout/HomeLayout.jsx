import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";

const HomeLayout = () => {
    return (
        <div>
            <Outlet />
            <Footer/>
        </div>
    );
};

export default HomeLayout;
