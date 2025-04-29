import axios from "axios";
import React from "react";
import styled from "styled-components";
import LoadingComTwo from "../shared/LoadingComTwo";

import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { updateHandler } from "../../utils/FetchHandlers";
import Swal from "sweetalert2";
const queryClient = new QueryClient();

const Recruiter = () => {
    const {
        isPending,
        isError,
        data: jobs,
        error,
        refetch,
    } = useQuery({
        queryKey: ["rec-jobs"],
        queryFn: async () => {
            const response = await axios.get(
                `https://full-stack-job-portal-server.vercel.app/api/v1/application/recruiter-jobs`,
                {
                    withCredentials: true,
                }
            );
            return response?.data?.result;
        },
    });

    const updateJobStatusMutation = useMutation({
        mutationFn: updateHandler,
        onSuccess: (data, variable, context) => {
            refetch();
            Swal.fire({
                icon: "success",
                title: "Status Updated",
                text: data?.message,
            });
        },
        onError: (error, variables, context) => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.response?.data,
            });
        },
    });

    const handleAcceptStatus = (id, recruiterId) => {
        const newStatus = { recruiterId, status: "accepted" };
        updateJobStatusMutation.mutate({
            body: newStatus,
            url: `https://full-stack-job-portal-server.vercel.app/api/v1/application/${id}`,
        });
    };

    const handleRejectStatus = (id, recruiterId) => {
        const newStatus = { recruiterId, status: "rejected" };
        updateJobStatusMutation.mutate({
            body: newStatus,
            url: `https://full-stack-job-portal-server.vercel.app/api/v1/application/${id}`,
        });
    };

    const handleResumeView = (drive) => {
        const newWindow = window.open(drive, "_blank");
        if (newWindow) {
            newWindow.focus();
        } else {
            alert("Please allow pop-ups for this site to open the PDF.");
        }
    };
    if (isPending) {
        return <LoadingComTwo />;
    }

    if (isError) {
        return (
            <h2 className="mt-8 text-2xl font-semibold text-center text-red-600">
                -- {error?.response?.data} --
            </h2>
        );
    }

    if (jobs) {
        // console.log(jobs);
    }

    if (!jobs?.length === 0) {
        return <h2 className="">No Application found</h2>;
    }

    return (
        <Wrapper>
            <div className="content-row">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Job Position</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs?.map((job, index) => {
                            let i =
                                index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={job?._id}>
                                    <td>{i}</td>
                                    <td>{job?.jobId?.position}</td>
                                    <td>{job?.jobId?.company}</td>
                                    <td>{job?.status}</td>
                                    <td className="action-row">
                                        <button
                                            className="action resume"
                                            onClick={() =>
                                                handleResumeView(job.resume)
                                            }
                                        >
                                            resume
                                        </button>

                                        {job?.status === "pending" && (
                                            <>
                                                {" "}
                                                <button
                                                    className="action accept"
                                                    onClick={() =>
                                                        handleAcceptStatus(
                                                            job._id,
                                                            job?.recruiterId
                                                        )
                                                    }
                                                >
                                                    accept
                                                </button>
                                                <button
                                                    className="action reject"
                                                    onClick={() =>
                                                        handleRejectStatus(
                                                            job._id,
                                                            job?.recruiterId
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                        {job?.status === "accepted" && (
                                            <button
                                                className="action reject"
                                                onClick={() =>
                                                    handleRejectStatus(
                                                        job._id,
                                                        job?.recruiterId
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>
                                        )}

                                        {job?.status === "rejected" && (
                                            <button
                                                className="action accept"
                                                onClick={() =>
                                                    handleAcceptStatus(
                                                        job._id,
                                                        job?.recruiterId
                                                    )
                                                }
                                            >
                                                accept
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .title-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: calc(0.9rem + 0.4vw);
        text-transform: capitalize;
        letter-spacing: 1px;
        font-weight: 600;
        opacity: 0.85;
        color: var(--color-black);
        position: relative;
    }
    .title-row:before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: calc(30px + 0.7vw);
        height: calc(2px + 0.1vw);
        background-color: var(--color-primary);
    }
    .content-row {
        overflow-x: auto;
        margin-top: calc(2rem + 0.5vw);
    }
    .table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
    .table thead {
        background-color: var(--color-accent);
        color: var(--color-white);
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: 400;
        text-transform: capitalize;
    }

    .table th,
    .table td {
        text-align: left;
        padding: 12px;
    }

    .table tbody tr {
        font-size: 15px;
        font-weight: 400;
        text-transform: capitalize;
        letter-spacing: 1px;
        transition: all 0.2s linear;
    }

    .table tbody tr:nth-child(even) {
        background-color: #00000011;
    }

    .table .action-row {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        column-gap: 12px;
    }
    .table .action-row .action {
        font-size: 12px;
        text-transform: capitalize;
        font-weight: 500;
        color: #fff;
        padding: 1px 6px;
        border-radius: 4px;
    }
    .action.accept {
        background-color: #168e24;
    }
    .action.reject {
        background-color: #f1322f;
    }
    .action.resume {
        background-color: #ef9712;
    }
`;

export default Recruiter;
