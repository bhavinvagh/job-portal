import React, { useState } from "react";

import { getAllHandler } from "../utils/FetchHandlers";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import LoadingComTwo from "../components/shared/LoadingComTwo";

import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { MdOutlineStackedBarChart } from "react-icons/md";
import { SlGraph } from "react-icons/sl";

const Stats = () => {
    const [isShowBarChart, setIsShowBarChart] = useState(false);
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["stats"],
        queryFn: () =>
            getAllHandler(
                `https://full-stack-job-portal-server.vercel.app/api/v1/admin/stats`
            ),
    });

    // Pi Chart Codes
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    if (isPending) {
        return <LoadingComTwo />;
    }

    if (isError) {
        return <h2 className="">{error.message}</h2>;
    }

    if (data) {
        console.log(data);
    }
    return (
        <Wrapper>
            <div className="">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg md:text-2xl opacity-80 font-semibold">
                        Overall Statistics
                    </h3>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data?.defaultStats}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data?.defaultStats?.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-12">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg md:text-2xl opacity-80 font-semibold">
                        Job Application Stats
                    </h3>
                    <div
                        className="graph-controller"
                        onClick={() => setIsShowBarChart(!isShowBarChart)}
                    >
                        {isShowBarChart ? (
                            <SlGraph title="Graph View" />
                        ) : (
                            <MdOutlineStackedBarChart title="Bar View" />
                        )}
                    </div>
                </div>
                {isShowBarChart ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data?.monthly_stats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="count"
                                fill="#ac04ac"
                                stroke="#ac04ac"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data?.monthly_stats}>
                            <CartesianGrid strokeDasharray="3/3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="count"
                                fill="#ac04ac"
                                stroke="#ac04ac"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .graph-controller {
        font-size: 28px;
        font-weight: 600;
        opacity: 0.7;
        text-transform: capitalize;
        cursor: pointer;
        transition: all 0.3s linear;
        border: 1px solid #00000045;
        display: inline-block;
        padding: 3px;
    }
    .graph-controller:hover {
        opacity: 0.9;
    }
`;

export default Stats;
