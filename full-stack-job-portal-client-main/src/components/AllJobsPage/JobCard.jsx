import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { TfiLocationPin } from "react-icons/tfi";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";

import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);

import { useUserContext } from "../../context/UserContext";

import { Link } from "react-router-dom";
import { postHandler } from "../../utils/FetchHandlers";
import Swal from "sweetalert2";

const JobCard = ({ job }) => {
    const date = dayjs(job?.jobDeadline).format("MMM Do, YYYY");
    const { user } = useUserContext();

    const handleApply = async (id) => {
        let currentDate = new Date();
        let date = currentDate.toISOString().slice(0, 10);
        const appliedJob = {
            applicantId: user?._id,
            recruiterId: job?.createdBy,
            jobId: id,
            status: "pending",
            dateOfApplication: date,
            resume: user?.resume || "",
        };
        try {
            const response = await postHandler({
                url: "https://full-stack-job-portal-server.vercel.app/api/v1/application/apply",
                body: appliedJob,
            });
            Swal.fire({
                icon: "success",
                title: "Hurray...",
                text: response?.data?.message,
            });
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error?.response?.data?.error[0].msg,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error?.response?.data,
                });
            }
        }
    };
    return (
        <Wrapper>
            <div className="card-container">
                <div className="card-header">
                    <div className="logo">
                        {/* <img src="" alt="" /> */}
                        <span>{job.company.charAt(1)}</span>
                    </div>
                    <div className="right">
                        <h2 className="title">{job?.position}</h2>
                        <h4 className="company">- {job?.company}</h4>
                    </div>
                </div>
                <div className="middle-row">
                    <div className="location" title="Last Date">
                        <FaRegCalendarAlt className="mr-2 text-lg" />
                        <span className="">{date}</span>
                    </div>
                    <div className="location">
                        <TfiLocationPin className="mr-2 text-lg" />
                        <span className="">{job?.jobLocation}</span>
                    </div>
                    <div className="type">
                        <BsFillBriefcaseFill className="mr-2 text-lg" />
                        <span className="capitalize">{job?.jobType}</span>
                    </div>
                    <div className="status capitalize">
                        <TbTargetArrow className="mr-2 text-lg" />
                        <span className={job?.jobStatus}>{job?.jobStatus}</span>
                    </div>
                </div>
                <div className="end-row">
                    <Link to={`/job/${job._id}`} className="detail-btn">
                        details
                    </Link>
                    {user?.role === "user" && (
                        <button
                            className="apply-btn"
                            onClick={() => handleApply(job._id)}
                        >
                            Apply
                        </button>
                    )}
                    {user?._id === job?.createdBy && (
                        <Link
                            to={`/dashboard/edit-job/${job._id}`}
                            className="detail-btn"
                        >
                            edit
                        </Link>
                    )}
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    /* max-width: 400px; */
    margin: 0 auto;
    .card-container {
        height: 100%;
        box-shadow: 0 4px 4px var(--shadow-medium),
            0 -2px 6px var(--shadow-medium);
        border-radius: 4px;
        padding: 2rem 1.5rem;
    }
    .card-container .card-header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .card-container .logo {
        margin-right: 18px;
        width: 50px;
        height: 50px;
        border-radius: 3px;
        background-color: #fb891f;
        display: flex;
        justify-content: center;
        align-items: center;
        /* optional */
        color: var(--color-white);
        font-size: 30px;
        font-weight: 700;
        text-transform: uppercase;
    }
    .right .title {
        text-transform: capitalize;
        font-size: calc(15px + 0.3vw);
        font-weight: 600;
        color: var(--color-black);
        line-height: 24px;
    }
    .right .company {
        display: inline-block;
        text-transform: capitalize;
        font-size: calc(11px + 0.15vw);
        font-weight: 600;
        color: var(--color-black);
        letter-spacing: 1px;
        padding: 1px 2px;
        border-radius: 4px;
    }
    @media screen and (max-width: 550px) {
        .right .title {
            line-height: 18px;
        }
    }

    .middle-row {
        margin-top: 20px;
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: calc(0.6rem + 0.09vw);
        align-items: center;
    }

    .location,
    .type,
    .status {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
    }

    .status span {
        background-color: #fefe7d;
        padding: 2px 15px;
        border-radius: 6px;
        text-transform: uppercase;
        font-size: 12.5px;
        font-weight: 400;
        letter-spacing: 1px;
    }
    .status span.pending {
        background-color: #fefe7d;
    }
    .status span.declined {
        background-color: #feb69a;
    }
    .status span.interview {
        background-color: #a0ffa3;
    }
    .end-row {
        margin-top: calc(18px + 0.4vw);
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .end-row .detail-btn {
        padding: 4px 18px;
        text-transform: capitalize;
        background-color: var(--color-black);
        color: var(--color-white);
        border-radius: 4px;
        letter-spacing: 1px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s linear;
        border: none;
    }
    .end-row .detail-btn:hover {
        background-color: var(--color-accent);
    }
    .end-row .apply-btn {
        padding: 4px 18px;
        text-transform: capitalize;
        background-color: var(--color-accent);
        color: var(--color-white);
        border-radius: 4px;
        letter-spacing: 1px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s linear;
        border: none;
        outline: none;
    }
    .end-row .apply-btn:hover {
        background-color: var(--color-black);
    }
`;
export default JobCard;
