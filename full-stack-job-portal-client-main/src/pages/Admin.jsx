import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { getAllHandler } from "../utils/FetchHandlers";
import LoadingComTwo from "../components/shared/LoadingComTwo";

const Admin = () => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["admin_info"],
        queryFn: () =>
            getAllHandler(
                `https://full-stack-job-portal-server.vercel.app/api/v1/admin/info`
            ),
    });

    if (isPending) {
        return <LoadingComTwo />;
    }
    if (data) {
        console.log(data);
    }
    return (
        <Wrapper>
            <div className="">
                <h2 className="text-lg md:text-xl font-semibold capitalize mb-3 text-gray-700">
                    User Info
                </h2>
                <div class="card-container">
                    {/* Total Members */}
                    <div class="relative p-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-md overflow-hidden">
                        <div class="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.user}
                        </div>
                        <div class="relative z-10 text-blue-100 leading-none font-semibold">
                            Total Members
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-blue-700 opacity-50"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>

                    {/* Admin */}
                    <div class="relative p-5 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-md overflow-hidden">
                        <div class="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.admin}
                        </div>
                        <div class="relative z-10 text-blue-100 leading-none font-semibold">
                            Admins
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-cyan-700 opacity-50"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>

                    {/* Recruiters */}
                    <div class="relative p-5 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-md overflow-hidden">
                        <div class="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.recruiter}
                        </div>
                        <div class="relative z-10 text-blue-100 leading-none font-semibold">
                            Recruiters
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-cyan-700 opacity-50"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>

                    {/* Members */}
                    <div class="relative p-5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-md overflow-hidden">
                        <div class="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.applicant}
                        </div>
                        <div class="relative z-10 text-blue-100 leading-none font-semibold">
                            Applicants
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-blue-700 opacity-50"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-lg md:text-xl font-bold capitalize mb-3 text-gray-700">
                    Job Info
                </h2>
                <div class="card-container">
                    {/* Total Jobs */}
                    <div class="relative p-5 bg-gradient-to-r from-orange-400 to-orange-600 rounded-md overflow-hidden">
                        <div class="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.job}
                        </div>
                        <div class="relative z-10 text-red-100 leading-none font-semibold">
                            Total Jobs
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-orange-700 opacity-50"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>

                    {/* Pending */}
                    <div class="relative p-5 bg-gradient-to-r from-green-400 to-green-600 rounded-md overflow-hidden">
                        <div class="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.pending}
                        </div>
                        <div class="relative z-10 text-blue-100 leading-none font-semibold">
                            Pending
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-green-700 opacity-50"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>

                    {/* Interview */}
                    <div class="relative p-5 bg-gradient-to-r from-purple-400 to-purple-600 rounded-md overflow-hidden">
                        <div class="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.interview}
                        </div>
                        <div class="relative z-10 text-blue-100 leading-none font-semibold">
                            Interview
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-purple-700 opacity-50"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </div>

                    {/* Rejected */}
                    <div class="relative p-5 bg-gradient-to-r from-red-400 to-red-600 rounded-md overflow-hidden">
                        <div class="relative z-10 mb-4 text-white text-4xl leading-none font-semibold">
                            {data?.declined}
                        </div>
                        <div class="relative z-10 text-red-100 leading-none font-semibold">
                            Declined
                        </div>
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            class="absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-red-700 opacity-50"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .card-container {
        display: grid;
        grid-template-columns: repeat(4, minmax(auto, 250px));
        /* justify-content: center; */
        align-items: center;
        gap: 20px;
    }
    @media screen and (max-width: 900px) {
        .card-container {
            grid-template-columns: repeat(3, minmax(auto, 300px));
        }
    }
    @media screen and (max-width: 640px) {
        .card-container {
            grid-template-columns: repeat(2, minmax(auto, 300px));
        }
    }
    @media screen and (max-width: 450px) {
        .card-container {
            grid-template-columns: 1fr;
        }
    }
`;

export default Admin;
