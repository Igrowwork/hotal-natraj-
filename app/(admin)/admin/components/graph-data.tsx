"use client"

import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

interface GraphDataProps {
    data: { month: string; totalPrice: number }[];
}

export const GraphData: React.FC<GraphDataProps> = ({ data }) => {
    return (
        <ResponsiveContainer width={'100%'} height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip formatter={(value) => `$${value}`} labelFormatter={(label) => `${label}`} />
                <Bar dataKey="totalPrice" fill="#3498db" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};