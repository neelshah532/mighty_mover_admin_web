// import React from 'react';
import { PieChart, Pie, Legend } from 'recharts';

const data01 = [
    { name: 'Group A', value: 400, fill: '#519DE9' },
    { name: 'Group B', value: 300, fill: '#7CC674' },
    { name: 'Group C', value: 400, fill: '#F4C145' },
];

export default function App() {
    const style = {
        top: 10,
        left: 350,
        lineHeight: '30px',
    };
    return (
        // <div style={{ width: '600px', height: '357px' }}>
            <PieChart width={434} height={357}>
                <Legend
                    iconSize={10}
                    width={120}
                    height={140}
                    layout="vertical"
                    verticalAlign="middle"
                    wrapperStyle={style}
                />
                <Pie
                    dataKey="value"
                    data={data01}
                    cx={217}
                    cy={178.5}
                    innerRadius={80}
                    outerRadius={120}
                    fill="#2967ff"
                    isAnimationActive={true}
                    label
                />
            </PieChart>
            
        // </div>
    );
}
