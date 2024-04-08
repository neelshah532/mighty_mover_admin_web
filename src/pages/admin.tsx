import { Content } from 'antd/es/layout/layout';
import {  useEffect, useState } from 'react';
import {  Button, Card, Layout } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Order_page from '../components/Order_page';
import {
    Statistic,
    FloatButton,
    Divider,
    Flex,
    Progress,
  
    ProgressProps,
} from 'antd';

import {
    DASHBOARD_CONTENT,
    // POPOVER_PROFILE,
    DASHBOARD_STATS_COSTS_MONEY,
    DASHBOARD_STATS_PROFIT_VAL,
    DASHBOARD_STATS_REVENUE_VAL,
    DASHBOARD_STATS_COSTS_MONEY_VAL,
    DASHBOARD_STATS_PROFIT,
    DASHBOARD_STATS_REVENUE,
    TERMS,
    COPYRIGHT,
    PURCHASE_ORDER_STATUS,
    DELIVERED,
    INPROGRESS,
    NOTDELIVERED,
    MONTHLY_DATA,
    MONTHLY_TARGET,
} from '../assets/constant/constant';

import CountUp from 'react-countup';

import { PieChart } from '../components/piechart';
import { LineChart } from '../components/linechart';

import DoughnutChart from '../components/DoughnutChart';
import Loader from '../components/Loader';
import Settings from '../components/Settings';
import Blog from '../components/Blog';
import Payment_page from '../components/Payment_page';
import Delivery_partner from '../components/Delivery_partner';
import Header_page from '../components/Header_page';
import Sider_page from '../components/Sider_page';
import UserPage from '../components/UserTable';

const Admin: React.FC = () => {
    const [toggle, settoggle] = useState(true);
    // const [loading, setLoading] = useState(false);
    // const [pic, setpic] = useState(false);
    const prefix = DASHBOARD_STATS_PROFIT_VAL >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
    const color = DASHBOARD_STATS_PROFIT_VAL >= 0 ? '#3f8600' : '#cf1322';

    useEffect(() => {
        const fetchdata = setTimeout(() => {
            settoggle(false);
        }, 0);

        return () => clearTimeout(fetchdata);
    }, []);

   
    const formatter = (value: number | string) => {
        if (typeof value === 'number') {
            return <CountUp end={value} duration={1} />;
        }
        return value;
    };
   

  
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
  

    return (
        <>
            {toggle ? (
                <Loader />
            ) : (
                <div
                    className="w-full "
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        overflowY: 'hidden',
                    }}
                >
                    <Layout className="w-full ">
                       <Header_page/>
                        <Layout>
                           <Sider_page/>
                            <Content
                                className="bg-gray-50 mt-16 p-1"
                                style={{
                                    overflow: 'auto',
                                    height: '100vh',
                                    // position: 'fixed',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                }}
                            >
                                <div className="grid  grid-cols-4 gap-4 m-4">
                                    <div className="row-start-1 col-start-1 row-end-2 col-end-2 w-full h-full">
                                        <Card
                                            bordered={false}
                                            className="w-auto flex-1 h-auto flex justify-center items-center"
                                        >
                                            <Statistic
                                                title={DASHBOARD_STATS_REVENUE}
                                                value={DASHBOARD_STATS_REVENUE_VAL}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<ArrowUpOutlined />}
                                                style={{ fontWeight: '700' }}
                                                formatter={formatter}
                                                suffix="Rs"
                                            />
                                        </Card>
                                    </div>
                                    <div className=" row-start-1 col-start-2 row-end-2 col-end-3 w-full h-full">
                                        <Card
                                            bordered={false}
                                            className="w-full flex-1 h-auto flex justify-center items-center"
                                        >
                                            <Statistic
                                                title={DASHBOARD_STATS_COSTS_MONEY}
                                                value={DASHBOARD_STATS_COSTS_MONEY_VAL}
                                                valueStyle={{ color: '#cf1322' }}
                                                prefix={<ArrowDownOutlined />}
                                                formatter={formatter}
                                                suffix="Rs"
                                                style={{ fontWeight: '700' }}
                                            />
                                        </Card>
                                    </div>
                                    <div className="row-start-1 col-start-3 row-end-2 col-end-4 w-full h-full ">
                                        <Card
                                            bordered={false}
                                            className="w-full flex-1 h-auto flex justify-center items-center"
                                        >
                                            <Statistic
                                                title={DASHBOARD_STATS_PROFIT}
                                                value={DASHBOARD_STATS_PROFIT_VAL}
                                                valueStyle={{ color: color }}
                                                formatter={formatter}
                                                style={{ fontWeight: '700' }}
                                                prefix={prefix}
                                                suffix="Rs"
                                            />
                                        </Card>
                                    </div>
                                    <div className=" row-start-1 col-start-4 row-end-3 col-end-5 w-full h-full">
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
                                    {/* PURCHASE_ORDER_STATUS section */}
                                    <div className=" row-start-2 col-start-3 row-end-3 col-end-4 w-full h-full">
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
                                    {/* DoughnutChart section */}
                                    <div className=" row-start-2 col-start-1 row-end-3 col-end-3 w-full h-full">
                                        <Card bordered={false} className="w-full flex-1 h-full">
                                            <DoughnutChart />
                                        </Card>
                                    </div>
                                </div>
                                {/* pie chart and line chart section */}
                                <div>
                                    <Flex gap="small" className="m-4">
                                        <Card className="w-3/4">
                                            <LineChart />
                                        </Card>
                                        <Card className="w-1/4 flex justify-center items-center ">
                                            <PieChart />
                                        </Card>
                                    </Flex>
                                </div>
                                {/* deshboard data content grid */}
                                <div className="grid grid-cols-4 m-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
                                    {DASHBOARD_CONTENT.map((item, index) => (
                                        <>
                                            <div key={index}>
                                                <Card title={item.TOTAL_ORDER} hoverable className="p-4 transition ">
                                                    {item.VAL}
                                                </Card>
                                            </div>
                                        </>
                                    ))}
                                </div>
                                <div>
                                    <Order_page />
                                </div>
                                <div>
                                    <Payment_page />
                                </div>
                                <div>
                                    <Settings />
                                </div>
                                <Divider /> {/* remove divider during final submission*/}
                                <div>
                                    <Blog />
                                </div>
                                <div>
                                    <UserPage/>
                                </div>
                                <div>
                                    <Delivery_partner />
                                </div>
                                <Flex justify="space-between" className="ml-4 mr-4 mb-4 text-gray-400">
                                    <div className="hover:text-gray-600">{COPYRIGHT}</div>
                                    <div className="hover:text-gray-600">{TERMS}</div>
                                </Flex>
                                <Divider></Divider>
                            </Content>
                        </Layout>
                        <FloatButton.BackTop />
                    </Layout>
                </div>
            )}
            {/* )} */}
        </>
    );
};

export default Admin;
