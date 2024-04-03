import React from 'react';
import { PieChart, Pie, Legend } from 'recharts';

const data01 = [
    { name: 'Group A', value: 400, fill: '#519DE9' },
    { name: 'Group B', value: 300, fill: '#7CC674' },
    { name: 'Group C', value: 400, fill: '#F4C145' },
];

export default function App() {
    const style = {
        top: 40,

        left: 380,
        lineHeight: '30px',
    };
    return (
        <PieChart width={1000} height={200}>
            <Pie
                dataKey="value"
                data={data01}
                cx={200}
                cy={100}
                innerRadius={40}
                outerRadius={70}
                fill="#2967ff"
                isAnimationActive={true}
                label
            />
            <Legend
                iconSize={10}
                width={120}
                height={140}
                layout="vertical"
                verticalAlign="middle"
                wrapperStyle={style}
            />
        </PieChart>
    );
}
