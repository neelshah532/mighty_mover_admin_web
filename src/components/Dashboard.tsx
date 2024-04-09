import { Card, Progress, Button, Flex } from 'antd';
import {
    DASHBOARD_CONTENT,
    DASHBOARD_STATS_COSTS_MONEY,
    DASHBOARD_STATS_PROFIT_VAL,
    DASHBOARD_STATS_REVENUE_VAL,
    DASHBOARD_STATS_COSTS_MONEY_VAL,
    DASHBOARD_STATS_PROFIT,
    DASHBOARD_STATS_REVENUE,
    PURCHASE_ORDER_STATUS,
    DELIVERED,
    INPROGRESS,
    NOTDELIVERED,
    MONTHLY_DATA,
    MONTHLY_TARGET,
} from '../assets/constant/constant';
import { PieChart } from '../components/piechart';
import { LineChart } from '../components/linechart';

import DoughnutChart from '../components/DoughnutChart';

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';

import { ProgressProps } from 'antd';
export default function Dashboard() {
    const twoColors: ProgressProps['strokeColor'] = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };
    const inprogress: ProgressProps['strokeColor'] = {
        '0%': '#ffd608',
        '100%': '#ffd608',
    };
    const notdeli: ProgressProps['strokeColor'] = {
        '0%': '#c40811',
        '100%': '#c40811',
    };
    const formatter = (value: number | string) => {
        if (typeof value === 'number') {
            return <CountUp end={value} duration={1} />;
        }
        return value;
    };

    const prefix =
        DASHBOARD_STATS_PROFIT_VAL >= 0 ? (
            <ArrowUpOutlined className="w-4 h-4" />
        ) : (
            <ArrowDownOutlined className="w-4 h-4" />
        );
    // const color = DASHBOARD_STATS_PROFIT_VAL >= 0 ? '#3f8600' : '#cf1322';
    return (
        <div className="bg-gray-50 p-1 font-inter overflow-hidden">
            <div className="grid  grid-cols-5 gap-4 m-4">
                <div className="w-full h-full">
                    <Card bordered={false} className="w-full bg-blue-50">
                        <div className="w-full flex-col ">
                            <div className="flex justify-start w-full text-[15px] font-semibold ">
                                {DASHBOARD_STATS_REVENUE}
                            </div>
                            <div className="flex justify-start w-full text-[24px] font-bold gap-1 items-center">
                                <div style={{ fontWeight: '700' }}>{
                                DASHBOARD_STATS_REVENUE_VAL / 1000
                                }</div>
                                <div style={{ fontWeight: '700' }}>{'K'}</div>
                                <div>{prefix}</div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className=" w-full h-full">
                    <Card bordered={false} className="w-full flex-1 h-auto flex bg-blue-50">
                        <div className="w-full flex-col ">
                            <div className="flex justify-start w-full text-[15px] font-semibold ">
                                {DASHBOARD_STATS_COSTS_MONEY}
                            </div>
                            <div className="flex justify-start w-full text-[24px] font-bold gap-1 items-center">
                                <div style={{ fontWeight: '700' }}>{DASHBOARD_STATS_COSTS_MONEY_VAL / 1000}</div>
                                <div style={{ fontWeight: '700' }}>{'K'}</div>
                                <div>{prefix}</div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className=" w-full h-full ">
                    <Card bordered={false} className="w-full flex-1 h-auto flex bg-blue-50">
                        <div className="w-full flex-col ">
                            <div className="flex justify-start w-full text-[15px] font-semibold ">
                                {DASHBOARD_STATS_PROFIT}
                            </div>
                            <div className="flex justify-start w-full  font-bold gap-1 items-center">
                                <div style={{ fontWeight: '700' }} className="text-[24px]">
                                    {DASHBOARD_STATS_PROFIT_VAL / 1000}
                                </div>
                                <div style={{ fontWeight: '700' }} className="text-[24px]">
                                    {'K'}
                                </div>
                                <div>{prefix}</div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className=" w-full h-full ">
                    <Card bordered={false} className="w-full flex-1 h-auto flex bg-blue-50">
                        <div className="w-full flex-col ">
                            <div className="flex justify-start w-full text-[15px] font-semibold ">
                                {DASHBOARD_STATS_PROFIT}
                            </div>
                            <div className="flex justify-start w-full  font-bold gap-1 items-center">
                                <div style={{ fontWeight: '700' }} className="text-[24px]">
                                    {DASHBOARD_STATS_PROFIT_VAL / 1000}
                                </div>
                                <div style={{ fontWeight: '700' }} className="text-[24px]">
                                    {'K'}
                                </div>
                                <div>{prefix}</div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className=" w-full h-full ">
                    <Card bordered={false} className="w-full flex-1 h-auto flex bg-blue-50">
                        <div className="w-full flex-col ">
                            <div className="flex justify-start w-full text-[15px] font-semibold ">
                                {DASHBOARD_STATS_PROFIT}
                            </div>
                            <div className="flex justify-start w-full  font-bold gap-1 items-center">
                                <div style={{ fontWeight: '700' }} className="text-[24px]">
                                    {DASHBOARD_STATS_PROFIT_VAL / 1000}
                                </div>
                                <div style={{ fontWeight: '700' }} className="text-[24px]">
                                    {'K'}
                                </div>
                                <div>{prefix}</div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div>
                <Flex gap="small" className="m-4">
                    <Card className="w-[60%] border-2">
                        <LineChart />
                    </Card>
                    <Card className="w-[40%] flex justify-center items-center ">
                        {/* <PieChart /> */}
                        <DoughnutChart />
                        {/* Doughtnut */}
                    </Card>
                </Flex>
            </div>
        
            <div className="w-full m-4 flex gap-2">
                <div className="w-[17%]">
                    <Card bordered={false} className="w-full flex-1 h-full ">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <div className="text-xl font-bold text-center"> {MONTHLY_TARGET}</div>
                            <div className="text-center">
                                <Progress type="circle" percent={90} />
                            </div>
                            <div className="text-gray-500 text-center ">{MONTHLY_DATA}</div>
                            <div>
                                <Button className="bg-blue-600 text-white">Read more</Button>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='w-[80%]'>
                <div className="grid grid-cols-4 flex-wrap w-full h-auto gap-2">
                {DASHBOARD_CONTENT.map((item, index) => (
                    <>
                        <div key={index} className="w-[200px] h-auto">
                            <Card title={item.TOTAL_ORDER} hoverable bordered className="p-0 transition w-full h-full">
                                {item.VAL}
                            </Card>
                        </div>
                    </>
                ))}
            </div>
                </div>
            </div>
            <div className='w-full m-4'>
                <div className='w-[30%]'>
  <div className="  w-full h-full">
                <Card className="w-full flex-1" title={PURCHASE_ORDER_STATUS}>
                    <div className="flex gap-2 ">
                        <div className="w-11/12 font-bold">{DELIVERED}</div>
                        <Progress percent={90} size="small" strokeColor={twoColors} />
                    </div>
                    <div className="flex gap-2">
                        <div className="w-11/12 font-bold">{INPROGRESS}</div>
                        <Progress percent={50} size="small" strokeColor={inprogress} />
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="w-11/12 font-bold">{NOTDELIVERED}</div>
                        <Progress percent={70} size="small" strokeColor={notdeli} />
                    </div>
                </Card>
            </div>
                </div>
                </div>
{/* 
            <div className=" w-full h-full">
                <Card bordered={false} className="w-full flex-1 h-full">
                    <DoughnutChart />
                </Card>
            </div> */}
        </div>
    );
}
