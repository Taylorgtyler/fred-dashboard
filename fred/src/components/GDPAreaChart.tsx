import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { GDPData } from '../types/dataTypes';

interface GDPAreaChartProps {
    data: GDPData[];
}

export const GDPAreaChart: React.FC<GDPAreaChartProps> = ({ data }) => {
    const formattedData = data.map(item => ({
        ...item,
        DATE: new Date(item.DATE).toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'short'
        })
    }));

    return (
        <div className="flex items-center justify-center w-full h-full">
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart
                    data={formattedData}
                    margin={{
                        top: 0,
                        right: 20,
                        left: 5,
                        bottom: 30,
                    }}
                >
                   
                    <XAxis 
                        dataKey="DATE"
                        tick={{ fill: '#ffffff', fontSize: 12 }}
                    />
                    <YAxis
                        tick={{ fill: '#ffffff', fontSize: 12 }}
                        
                        tickFormatter={(value) => `$${value.toLocaleString()}B`}
                    />
                    <Tooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`, "GDP"]}
                        labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="GDPC1" 
                        stroke="#8884d8" 
                        fill="#8884d8"
                        fillOpacity={0.5}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};