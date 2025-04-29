import React from "react";
import { useUserContext } from "../context/UserContext";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { CiSquarePlus } from "react-icons/ci";
import styled from "styled-components";

import Swal from "sweetalert2";
import { getAllHandler } from "../utils/FetchHandlers";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ManageUsers = () => {
    const { user: me } = useUserContext();
    const {
        isPending,
        isError,
        data: users,
        error,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: () =>
            getAllHandler(`https://full-stack-job-portal-server.vercel.app/api/v1/users`),
    });

    const updateUserModal = (id, role) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#19b74b",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                UpdateUserRole(id, role);
            }
        });
    };

    const UpdateUserRole = async (id, role) => {
        const updateUser = { id, role };
        try {
            const response = await axios.patch(
                `https://full-stack-job-portal-server.vercel.app/api/v1/admin/update-role`,
                updateUser,
                { withCredentials: true }
            );
            refetch();
            Swal.fire({
                title: "Done!",
                text: "Role Updated Successfully",
                icon: "success",
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Sorry!",
                text: error?.response?.data,
                icon: "error",
            });
        }
    };

    if (isPending) {
        return <LoadingComTwo />;
    }
    if (users) {
        // console.log(users);
    }

    if (!users?.result?.length) {
        return (
            <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
                -- User List is Empty --
            </h2>
        );
    }
    return (
        <Wrapper>
            <div className="title-row">
                Manage Users
                <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
            </div>
            <div className="content-row">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.result?.map((user, index) => {
                            let i =
                                index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={user._id}>
                                    <td>{i}</td>
                                    <td>{user?.username}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.role}</td>
                                    <td className="action-row">
                                        {user?._id === me._id ? null : (
                                            <>
                                                {" "}
                                                {user?.role ===
                                                "admin" ? null : (
                                                    <button
                                                        className="action admin"
                                                        onClick={() =>
                                                            updateUserModal(
                                                                user._id,
                                                                "admin"
                                                            )
                                                        }
                                                    >
                                                        admin
                                                    </button>
                                                )}
                                                {user?.role ===
                                                "recruiter" ? null : (
                                                    <button
                                                        className="action recruiter"
                                                        onClick={() =>
                                                            updateUserModal(
                                                                user._id,
                                                                "recruiter"
                                                            )
                                                        }
                                                    >
                                                        recuiter
                                                    </button>
                                                )}
                                                {user?.role ===
                                                "user" ? null : (
                                                    <button
                                                        className="action user"
                                                        onClick={() =>
                                                            updateUserModal(
                                                                user._id,
                                                                "user"
                                                            )
                                                        }
                                                    >
                                                        user
                                                    </button>
                                                )}
                                            </>
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
        font-size: 16px;
        padding: 1px 8px;
        border-radius: 4px;
        color: #fff;
        text-transform: capitalize;
    }
    .action.recruiter {
        background-color: #ac04ac;
    }
    .action.admin {
        background-color: #5f14c7;
    }
    .action.user {
        background-color: #c714c7;
    }
`;

export default ManageUsers;
