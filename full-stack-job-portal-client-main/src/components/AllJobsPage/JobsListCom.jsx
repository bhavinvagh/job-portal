import React from "react";
import { useJobContext } from "../../context/JobContext";
import LoadingComTwo from "../shared/LoadingComTwo";
import styled from "styled-components";
import JobCard from "./JobCard";

const JobsListCom = () => {
    const { jobLoading, jobs } = useJobContext();

    if (jobLoading) {
        return <LoadingComTwo />;
    }

    if (!jobs?.result?.length) {
        return (
            <h2 className="text-lg md:text-3xl text-center font-bold mt-24 text-red-600">
                No Job Found
            </h2>
        );
    }
    return (
        <Wrapper>
            <h5 className="job-count">
                Shows
                <span className="fancy">
                    {jobs?.result?.length < 10
                        ? `0${jobs?.result?.length}`
                        : jobs?.result?.length}
                </span>
                of total
                <span className="fancy">
                    {jobs?.totalJobs < 10
                        ? `0${jobs?.totalJobs}`
                        : jobs?.totalJobs}
                </span>
                Jobs
            </h5>

            <div className="list-container">
                {jobs?.result?.map((job) => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: var(--color-gray);
    width: 100%;
    margin-top: 1.5rem;
    .job-count {
        margin-top: 14px;
        font-size: 11px;
        font-weight: 600;
        color: var(--color-black);
        opacity: 0.8;
    }
    .job-count .fancy {
        color: var(--color-primary);
        margin: 0 5px;
        font-size: 13px;
        opacity: 1;
    }

    .list-container {
        width: 100%;
        margin-top: 1.5rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: space-around;
        align-items: center;
        grid-gap: 1.5rem;
        flex-wrap: wrap;
    }
    @media (max-width: 1018px) {
        .list-container {
            grid-template-columns: 1fr 1fr;
            grid-gap: 1.5rem;
            justify-content: center;
        }
    }
    @media screen and (max-width: 670px) {
        .list-container {
            grid-template-columns: 1fr;
            grid-gap: 1.5rem;
            justify-content: center;
        }
    }
`;

export default JobsListCom;
