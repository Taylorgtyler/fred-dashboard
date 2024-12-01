import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


interface StackedLineChartProps {
    dataset1: any[];
    dataset2: any[];
    label1: string;
    label2: string;
    lineName1: string;
    lineName2: string;
}

export const StackedLineChart: React.FC<StackedLineChartProps> = ({ 
    dataset1, 
    dataset2, 
    label1, 
    label2,
    lineName1,
    lineName2 
}) => {


    const formattedData = dataset1.map(item1 => {
        const matchingItem2 = dataset2.find(
            item2 => item2.DATE === item1.DATE
        );
        

        return {
            DATE: new Date(item1.DATE).toLocaleDateString('en-US', { 
                year: 'numeric',
                month: 'short'
            }),
            dataset1Value: item1[label1],
            dataset2Value: matchingItem2?.[label2]
        };
    });

    return (
        <div className="flex items-center justify-center w-full h-full">
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
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
                        formatter={(value: number, name: string) => {
                            const displayName = {
                                dataset1Value: lineName1,
                                dataset2Value: lineName2
                            }[name] || name;
                            
                            return [`$${value.toLocaleString()}`, displayName];
                        }}
                        labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="dataset1Value" 
                        stroke="#8884d8" 
                        name={lineName1}
                    />
                    <Line
                        type="monotone"
                        dataKey="dataset2Value"
                        stroke="#82ca9d"
                        name={lineName2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};