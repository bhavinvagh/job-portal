import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Job_Status, Job_Type, Job_Sort_By } from "../../utils/JobData";

import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useJobContext } from "../../context/JobContext";

const SearchAndFilter = () => {
    const { handleJobFetch } = useJobContext();

    const [typeFilter, setTypeFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const baseUrl =
            "https://full-stack-job-portal-server.vercel.app/api/v1/jobs?page=1&limit=5";
        let url = baseUrl;
        const queryParams = {};

        if (searchQuery) {
            queryParams.search = searchQuery;
        }
        if (typeFilter) {
            queryParams.jobType = typeFilter;
        }
        if (statusFilter) {
            queryParams.jobStatus = statusFilter;
        }
        if (sortBy) {
            queryParams.sort = sortBy;
        }
        // Constructing query string
        const queryString = new URLSearchParams(queryParams).toString();

        if (queryString) {
            url += `&${queryString}`;
            // url += `?${queryString}`;
        }
        console.log(url);
        handleJobFetch(url);
    }, [typeFilter, statusFilter, sortBy, searchQuery]);

    return (
        <Wrapper>
            <form action="" className="form">
                <div className="filter">
                    <div className="hidden">
                        <CiFilter />
                    </div>
                    <div className="type-row">
                        <span className="text">Types</span>
                        <select
                            className="type-select"
                            onChange={(e) => setTypeFilter(e.target.value)}
                            value={typeFilter}
                        >
                            <option value="">default</option>
                            {Job_Type?.map((type, i) => {
                                return (
                                    <option key={i + type} value={type}>
                                        {type}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="status-row">
                        <span className="text">Status</span>
                        <select
                            className="status-select"
                            onChange={(e) => setStatusFilter(e.target.value)}
                            value={statusFilter}
                        >
                            <option value="">default</option>
                            {Job_Status?.map((type, i) => {
                                return (
                                    <option key={i + type} value={type}>
                                        {type}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="status-row">
                        <span className="text">Sort By</span>
                        <select
                            className="status-select"
                            onChange={(e) => setSortBy(e.target.value)}
                            value={sortBy}
                        >
                            <option value="">default</option>
                            {Job_Sort_By?.map((type, i) => {
                                return (
                                    <option key={i + type} value={type}>
                                        {type}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="search-row">
                    <input
                        type="text"
                        name=""
                        id=""
                        className="search"
                        placeholder="Type Job Title"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                    <span className="icon">
                        <CiSearch />
                    </span>
                </div>
            </form>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background-color: #f8f4f4;
    padding: 1.2rem 1rem;
    display: flex;
    align-items: center;
    border-radius: 6px;
    .form {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .filter {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        column-gap: 1.1rem;
    }
    .hidden {
        display: inline-block;
    }
    @media screen and (max-width: 778px) {
        .form {
            flex-direction: column;
            row-gap: 1rem;
        }
        .filter {
            justify-content: center;
            row-gap: 0.75rem;
        }
        .hidden {
            display: none;
        }
    }
    .type-row,
    .status-row {
        display: flex;
        align-items: center;
    }
    .text {
        font-size: 13px;
        font-weight: 400;
        color: var(--color-black);
        opacity: 0.75;
        /* margin-right: 5px; */
        background-color: #e4e4e4;
        height: 100%;
        padding: 2px 5px;
    }
    .type-select,
    .status-select {
        text-transform: capitalize;
        padding: 1px 4px;
        outline: none;
        border: 1px solid #0000002c;
        border-radius: 0 3px 3px 0;
        color: #000;
        opacity: 0.8;
        font-size: 13px;
        background-color: #fafafa;
    }
    .search-row {
        display: flex;
        align-items: center;
    }
    .search-row .search {
        padding: 5px 8px;
        border: 1px solid #0000003d;
        font-size: 12px;
        border-radius: 3px 0 0 3px;
    }

    .search-row .search:focus {
        border: 1px solid #000000ad;
        outline: none;
    }
    .search-row .icon {
        background-color: #e4e4e4;
        border: 1px solid #0000003d;
        border-left: 0;
        color: var(--color-black);
        font-weight: 900;
        padding: 5.5px 6px;
        font-size: 17px;
        border-radius: 0 3px 3px 0;
    }
`;

export default SearchAndFilter;
