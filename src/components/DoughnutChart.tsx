// import React from 'react';
import { PieChart, Pie, Legend, ResponsiveContainer } from 'recharts';

const data01 = [
    { name: 'Group A', value: 400, fill: '#2967ff', borderColor: 'white', borderWidth: 1 },
    { name: 'Group B', value: 300, fill: '#7CC674', borderColor: 'white', borderWidth: 1 },
    { name: 'Group C', value: 400, fill: '#F4C145', borderColor: 'white', borderWidth: 1 },
];

export default function App() {
    const style = {
        top: 10,
        left: 300,
        lineHeight: '30px',
        maxHeight: 200,
    };
    return (
        <div className="w-[30%] h-[30%] max-md:w-[30%] max-md:h-[30%]">
            <ResponsiveContainer width={434} height={357} minHeight={250} minWidth={250}>
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
                        innerRadius={40}
                        outerRadius={80}
                        fill="#2967ff"
                        isAnimationActive={true}
                        label
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
