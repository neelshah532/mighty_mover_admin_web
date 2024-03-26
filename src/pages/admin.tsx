import { Content, Header } from 'antd/es/layout/layout';

import { useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FloatButton, Avatar, Divider } from 'antd';
// import { Pie } from 'react-chartjs-2';
import { Badge } from 'antd';
import { Button, Card, Layout, Menu, Popover, Table } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Statistic } from 'antd';
import { message } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { FaHome } from 'react-icons/fa';
import { MdOutlineContactPage } from 'react-icons/md';

import logo from '../assets/Images/Group 1.svg';

import { FaRegUserCircle } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';

import {
    DASHBOARD_CONTENT,
    POPOVER_LOGOUT,
    POPOVER_PROFILE,
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
} from '../assets/constant/constant';
import type { TableColumnsType } from 'antd';
import { Flex } from 'antd';
import { DataType } from '../assets/dto/data.type';
import { Empty } from 'antd';
import { IoMdSettings } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';
import { BiLogOut } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import CountUp from 'react-countup';
import { Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
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
    const [toggle, settoggle] = useState(false);
    const [toggle1, settoggle1] = useState(false);

    const [loading, setLoading] = useState(false);
    const [pic, setpic] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const prefix = DASHBOARD_STATS_PROFIT_VAL >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
    const color = DASHBOARD_STATS_PROFIT_VAL >= 0 ? '#3f8600' : '#cf1322';

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

    const columns: TableColumnsType<DataType> = DATA_COL;
    const data: DataType[] = ORDER_TABLE;
    const payment_colums = PAYMENT_DATA;
    const payment_data = PAYMENT_DATA_COL;
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
        setpic(true);
        message.info(`Update Success`);
        settoggle1(true);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleUsernameChange = (e: ChangeEventHandler<HTMLInputElement>) => {
        setname(e.target.value);
    };

    return (
        <>
            <div className="w-full">
                <Layout className="container border-red-400" style={{ width: '100%' }}>
                    <Header>
                        <Flex justify="space-between">
                            <Flex>
                                {toggle ? (
                                    <></>
                                ) : (
                                    <Button
                                        className="text-white mt-3 mr-2 text-2xl border-none font-semibold w-full"
                                        onClick={handletoggle}
                                    >
                                        <IoMenu />
                                    </Button>
                                )}
                            </Flex>

                            <img src={logo} alt="logo" />
                            <Flex gap="small" align="center" justify="flex-end">
                                <Avatar
                                    src={
                                        pic ? (
                                            <img src={imageUrl} width={100} height={100} alt="avatar" />
                                        ) : (
                                            <UserOutlined />
                                        )
                                    }
                                    className="rounded-full"
                                />

                                <Popover
                                    title="Admin"
                                    content={
                                        toggle1 ? (
                                            <div className="flex gap-4 items-center">
                                                {name} <img src={imageUrl} width={50} height={50} alt="avatar" />
                                            </div>
                                        ) : (
                                            'ADMIN'
                                        )
                                    }
                                >
                                    <Button
                                        className="text-white font-semibold text-xl text-center mt-5"
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
                                </Popover>
                                <Popover title={POPOVER_LOGOUT}>
                                    <Button className="text-white font-semibold text-xl" danger>
                                        <BiLogOut />
                                    </Button>
                                </Popover>
                            </Flex>
                        </Flex>
                    </Header>
                    <Layout>
                        <Sider theme="dark" collapsed={collapse}>
                            <Menu
                                theme="dark"
                                triggerSubMenuAction="hover"
                                // onClick={({ key }) => {
                                //   if (key === "collapse") {
                                //     setcollapse(!collapse);
                                //   }
                                // }}
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
                                        // children: [
                                        //   {
                                        //     label: "Stripe",
                                        //     key: " stripe",
                                        //     icon: <FaStripe />,
                                        //   },
                                        //   {
                                        //     label: "Credit/Debit Card",
                                        //     key: "card",
                                        //     icon: <BsCreditCard2FrontFill />,
                                        //   },
                                        //   {
                                        //     label: "Cash",
                                        //     key: "cash",
                                        //     icon: <IoCashOutline />,
                                        //   },
                                        //   {
                                        //     label: "UPI",
                                        //     key: "upi",
                                        //     icon: <MdOutlinePhonelinkRing />,
                                        //   },
                                        // ],
                                    },
                                    {
                                        label: 'Settings',
                                        key: 'settings',
                                        icon: <IoMdSettings />,
                                    },
                                ]}
                            ></Menu>
                        </Sider>
                        <Content style={{ height: 'auto' }} className="bg-gray-200">
                            <Flex gap="small" className="m-4">
                                <Card bordered={false} className="w-full transition-all duration-300 hover:scale-105">
                                    <Statistic
                                        title={DASHBOARD_STATS_REVENUE}
                                        value={DASHBOARD_STATS_REVENUE_VAL}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={<ArrowUpOutlined />}
                                        formatter={formatter}
                                        suffix="Rs"
                                    />
                                </Card>
                                <Card bordered={false} className="w-full transition-all duration-300 hover:scale-105">
                                    <Statistic
                                        title={DASHBOARD_STATS_COSTS_MONEY}
                                        value={DASHBOARD_STATS_COSTS_MONEY_VAL}
                                        valueStyle={{ color: '#cf1322' }}
                                        prefix={<ArrowDownOutlined />}
                                        formatter={formatter}
                                        suffix="Rs"
                                    />
                                </Card>
                                <Card bordered={false} className="w-full transition-all duration-300 hover:scale-105">
                                    <Statistic
                                        title={DASHBOARD_STATS_PROFIT}
                                        value={DASHBOARD_STATS_PROFIT_VAL}
                                        valueStyle={{ color: color }}
                                        formatter={formatter}
                                        prefix={prefix}
                                        suffix="Rs"
                                    />
                                </Card>
                            </Flex>
                            <div>
                                <Flex gap="small" className="m-4">
                                    <Card className="w-3/4"></Card>
                                    <Card className="w-1/4">
                                        {/* <Pie options="" data="" /> */}
                                    </Card>
                                </Flex>
                            </div>
                            <div className="grid grid-cols-4 m-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2">
                                {DASHBOARD_CONTENT.map((item, index) => (
                                    <>
                                        <div key={index}>
                                            <Card
                                                title={item.TOTAL_ORDER}
                                                hoverable
                                                className="p-4 transition hover:scale-105"
                                            >
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
                            <Divider></Divider>
                            <Flex justify="space-between" className="ml-4 mr-4 mb-4 text-gray-400">
                                <div className="hover:text-gray-600">{COPYRIGHT}</div>
                                <div className="hover:text-gray-600">{TERMS}</div>
                            </Flex>
                        </Content>
                    </Layout>
                </Layout>
                <FloatButton.BackTop />
            </div>
        </>
    );
};

export default Admin;
