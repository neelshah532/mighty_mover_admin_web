import { Content, Header } from 'antd/es/layout/layout';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Button, Card, Layout, Menu, Table } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {
    Statistic,
    message,
    Badge,
    FloatButton,
    Divider,
    Tooltip,
    Flex,
    Progress,
    Empty,
    Modal,
    Input,
    Upload,
    ProgressProps,
} from 'antd';
import Sider from 'antd/es/layout/Sider';
import { FaHome } from 'react-icons/fa';
import { MdOutlineContactPage, MdOutlinePayment } from 'react-icons/md';
import logo from '../assets/Images/Group 1.svg';
import { FaRegUserCircle } from 'react-icons/fa';
import {
    DASHBOARD_CONTENT,
    POPOVER_LOGOUT,
    // POPOVER_PROFILE,
    PAYMENT_DATA,
    PAYMENT_DATA_COL,
    ORDER_TABLE,
    DATA_COL,
    DASHBOARD_STATS_COSTS_MONEY,
    DASHBOARD_STATS_PROFIT_VAL,
    DASHBOARD_STATS_REVENUE_VAL,
    DASHBOARD_STATS_COSTS_MONEY_VAL,
    DASHBOARD_STATS_PROFIT,
    DASHBOARD_STATS_REVENUE,
    TERMS,
    COPYRIGHT,
    DELIVERY_PARTNER,
    DELIVERY_DATA_COL,
    PURCHASE_ORDER_STATUS,
    DELIVERED,
    INPROGRESS,
    NOTDELIVERED,
    MONTHLY_DATA,
    MONTHLY_TARGET,
} from '../assets/constant/constant';
import { IoMdSettings } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import CountUp from 'react-countup';
import { UserOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PieChart } from '../components/piechart';
import { LineChart } from '../components/linechart';
import { ColumnProps } from 'antd/es/table';
import { DeliveryPartner, Order } from '../assets/dto/data.type';
import DoughnutChart from '../components/DoughnutChart';
import Loader from '../components/Loader';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const Admin: React.FC = () => {
    const [collapse, setcollapse] = useState(false);
    const [name, setname] = useState('');
    const [toggle, settoggle] = useState(true);
    const [toggle1, settoggle1] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [pic, setpic] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const prefix = DASHBOARD_STATS_PROFIT_VAL >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
    const color = DASHBOARD_STATS_PROFIT_VAL >= 0 ? '#3f8600' : '#cf1322';

    useEffect(() => {
        const fetchdata = setTimeout(() => {
            settoggle(false);
        }, 2000);

        return () => clearTimeout(fetchdata);
    }, []);

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <div>
            <button style={{ border: 0, background: 'none' }} type="button">
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </button>
        </div>
    );

    const columns: ColumnProps<Order>[] = DATA_COL;
    const data: Order[] = ORDER_TABLE;
    const payment_colums = PAYMENT_DATA;
    const payment_data = PAYMENT_DATA_COL;
    const delivery_data = DELIVERY_PARTNER;
    const delivery_data_col: ColumnProps<DeliveryPartner>[] = DELIVERY_DATA_COL;
    const formatter = (value: number | string) => {
        if (typeof value === 'number') {
            return <CountUp end={value} duration={1} />;
        }
        return value;
    };
    const handletoggle = () => {
        setcollapse(!collapse);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        // setpic(true);
        message.info(`Update Success`);
        settoggle1(true);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setname(e.target.value);
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
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
        message.success('You have been logged out');
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
                        <Header className="fixed z-10 w-full bg-white shadow-sm shadow-gray-400">
                            <Flex justify="space-between">
                                <Flex>
                                    {toggle1 ? (
                                        <></>
                                    ) : (
                                        <Button
                                            className="text-white mt-3 mr-2 text-2xl border-none font-semibold w-full bg-black"
                                            onClick={handletoggle}
                                        >
                                            <IoMenu />
                                        </Button>
                                    )}
                                </Flex>

                                <img src={logo} alt="logo" />
                                <Flex gap="small" align="center" justify="flex-end">
                                    {/* <Avatar
                                    src={
                                        pic ? (
                                            <img src={imageUrl} width={100} height={100} alt="avatar" />
                                        ) : (
                                            <UserOutlined className='bg-black text'/>
                                        )
                                    }
                                    className="rounded-full"
                                /> */}

                                    <Tooltip
                                        title={
                                            toggle1 ? (
                                                <div className="flex  items-center">
                                                    {name} <img src={imageUrl} width={50} height={50} alt="avatar" />
                                                </div>
                                            ) : (
                                                <div>{'ADMIN'}</div>
                                            )
                                        }
                                    >
                                        <Button
                                            className="text-white font-semibold bg-black text-xl text-center mt-5"
                                            onClick={showModal}
                                        >
                                            <FaUser />
                                        </Button>
                                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                            <Flex vertical>
                                                <Upload
                                                    name="avatar"
                                                    listType="picture-card"
                                                    className="avatar-uploader "
                                                    showUploadList={false}
                                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                    beforeUpload={beforeUpload}
                                                    onChange={handleChange}
                                                >
                                                    {imageUrl ? (
                                                        <img src={imageUrl} alt="avatar" width={100} height={100} />
                                                    ) : (
                                                        uploadButton
                                                    )}
                                                </Upload>
                                                <Input
                                                    size="large"
                                                    placeholder="Username"
                                                    prefix={<UserOutlined />}
                                                    value={name}
                                                    onChange={handleUsernameChange}
                                                />
                                                <br></br>
                                                <Input
                                                    size="large"
                                                    placeholder="Password"
                                                    prefix={<RiLockPasswordLine />}
                                                />
                                                <br></br>
                                            </Flex>
                                        </Modal>
                                    </Tooltip>
                                    <Tooltip title={POPOVER_LOGOUT}>
                                        <Button
                                            className="text-white font-semibold text-xl"
                                            onClick={handleLogout}
                                            danger
                                        >
                                            <BiLogOut />
                                        </Button>
                                    </Tooltip>
                                </Flex>
                            </Flex>
                        </Header>
                        <Layout>
                            <Sider
                                theme="light"
                                collapsed={collapse}
                                collapsedWidth={80}
                                style={{
                                    overflow: 'auto',
                                    height: '100vh',
                                    // position: 'fixed',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                }}
                            >
                                <Menu
                                    className="mt-16"
                                    theme="light"
                                    triggerSubMenuAction="hover"
                                    items={[
                                        {
                                            label: 'Dashboard',
                                            key: 'Home',
                                            icon: <FaHome />,
                                        },
                                        {
                                            label: 'Order',
                                            key: 'order',
                                            icon: (
                                                <Badge count={data.length} size="small">
                                                    <MdOutlineContactPage />{' '}
                                                </Badge>
                                            ),
                                        },
                                        {
                                            label: 'Delivery Partner',
                                            key: 'delivery',
                                            icon: <FaRegUserCircle />,
                                        },
                                        {
                                            label: 'Payment Details',
                                            key: 'payment',
                                            icon: <MdOutlinePayment />,
                                        },
                                        {
                                            label: 'Settings',
                                            key: 'settings',
                                            icon: <IoMdSettings />,
                                        },
                                    ]}
                                ></Menu>
                            </Sider>
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
                                        <Card className="w-full">
                                            <LineChart />
                                        </Card>
                                        <Card className="w-one-third flex justify-center items-center ">
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
                                    {columns.length === 0 ? (
                                        <Empty />
                                    ) : (
                                        <>
                                            <Card title="Order" className="m-2 random:w-1/2">
                                                <Table
                                                    rowClassName="text-center"
                                                    dataSource={data}
                                                    pagination={{ pageSize: 4 }}
                                                    columns={columns}
                                                    bordered
                                                    sticky
                                                    className="w-full"
                                                ></Table>
                                            </Card>
                                        </>
                                    )}
                                </div>
                                <div>
                                    {payment_colums.length === 0 ? (
                                        <Empty />
                                    ) : (
                                        <>
                                            <Card title="Payment" className="m-2">
                                                <Table
                                                    rowClassName="text-center"
                                                    dataSource={payment_colums}
                                                    pagination={{ pageSize: 2 }}
                                                    columns={payment_data}
                                                    bordered
                                                    sticky
                                                    className="w-full"
                                                ></Table>
                                            </Card>
                                        </>
                                    )}
                                </div>
                                <div>
                                    {payment_colums.length === 0 ? (
                                        <Empty />
                                    ) : (
                                        <>
                                            <Card title="Delivery Partner" className="m-2">
                                                <Table
                                                    rowClassName="text-center"
                                                    dataSource={delivery_data}
                                                    pagination={{ pageSize: 2 }}
                                                    columns={delivery_data_col}
                                                    bordered
                                                    sticky
                                                    className="w-full"
                                                ></Table>
                                            </Card>
                                        </>
                                    )}
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
