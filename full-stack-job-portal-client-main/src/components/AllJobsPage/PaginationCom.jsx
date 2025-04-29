import React from "react";

import ReactPaginate from "react-paginate";
import { useJobContext } from "../../context/JobContext";
import styled from "styled-components";

const PaginationCom = () => {
    const { handleJobFetch, jobs } = useJobContext();

    const handlePageClick = (e) => {
        // const newOffset = (e.selected * itemsPerPage) % items.length;
        // console.log(
        //     `User requested page number ${e.selected}, which is offset ${newOffset}`
        // );
        // setItemOffset(newOffset);
        handleJobFetch(
            `https://full-stack-job-portal-server.vercel.app/api/v1/jobs?page=${
                e.selected + 1
            }&limit=5`
        );
    };

    return (
        <Wrapper>
            <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={jobs?.pageCount}
                previousLabel="<"
                nextLabel=">"
                renderOnZeroPageCount={null}
                className="job-list"
                pageClassName="item"
                activeClassName="active"
                previousClassName="prev-item"
                nextClassName="next-item"
                disabledClassName="disabled-item"
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 20px;
    .job-list {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .job-list .item,
    .prev-item,
    .next-item {
        font-size: 15px;
        font-weight: 500;
        color: #000;
        padding: 1px 8px;
        border: 1px solid var(--color-accent);
        border-radius: 3px;
    }
    .job-list .active {
        border: 1px solid var(--color-accent);
        background-color: var(--color-accent);
        color: var(--color-white);
    }
    .job-list .disabled-item {
        background-color: #d3d3d3;
        border: none;
        color: #000;
        cursor: not-allowed;
    }
`;
export default PaginationCom;
