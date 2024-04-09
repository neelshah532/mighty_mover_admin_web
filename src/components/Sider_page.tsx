'use client';
// import { useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Button, Flex, Menu } from 'antd';
import { FaHome } from 'react-icons/fa';
import { Badge } from 'antd';
import { MdOutlineContactPage, MdOutlinePayment } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { ORDER_TABLE } from '../assets/constant/constant';
import { Order } from '../assets/dto/data.type';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { useState } from 'react';
import logo from '../assets/Images/Group 1.svg';

export default function Sider_page() {
    // const [collapse, setCollapse] = useState(false);
    const data: Order[] = ORDER_TABLE;
    // const [toggle1, settoggle1] = useState(false);
    const [collapse, setcollapse] = useState(false);
    const navigate = useNavigate();
    const handletoggle = () => {
        setcollapse(!collapse);
    };
    const navigateToSettings = (key: string) => {
        navigate(`/setting/${key}`);
    };
    return (
        <div>
            <Sider
                theme="light"
                collapsed={collapse}
                collapsedWidth={80}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    transition:'all 0.3s ease',
                }}
                className="shadow-sm shadow-gray-400 "
            >
                <Flex>
                    {/*
                    {toggle1 ? (
                        <></>
                    ) : ( */}
                    <div className="flex items-center mt-3">
                        <img src={logo} alt="logo" className="border border-cyan-400" />
                    </div>
                    <Button
                        className="mt-3 text-2xl border-none text-center flex items-center justify-content rounded-md"
                        onClick={handletoggle}
                    >
                        <IoArrowBack />
                    </Button>
                    {/* )}
                     */}
                </Flex>
                <Menu className="mt-16" theme="light" triggerSubMenuAction="hover" mode="inline">
                    <Menu.Item key="Home" icon={<FaHome />} onClick={() => navigate('/')}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item
                        key="order"
                        icon={
                            <Badge count={data.length} size="small">
                                <MdOutlineContactPage />
                            </Badge>
                        }
                        onClick={() => navigate('/orders')}
                    >
                        Order
                    </Menu.Item>
                    <Menu.Item key="delivery" icon={<FaRegUserCircle />} onClick={() => navigate('/delivery-partner')}>
                        Delivery Partner
                    </Menu.Item>
                    <Menu.Item key="payment" icon={<MdOutlinePayment />} onClick={() => navigate('/payments')}>
                        Payment Details
                    </Menu.Item>
                    <Menu.SubMenu key="settings" title="Settings" icon={<IoMdSettings />}>
                        <Menu.Item key="setting" onClick={() => navigateToSettings('email-Verification')}>
                            Email Verification
                        </Menu.Item>
                        <Menu.Item key="setting1" onClick={() => navigateToSettings('blog-settings')}>
                            Blog Settings
                        </Menu.Item>
                        <Menu.Item key="setting2" onClick={() => navigateToSettings('user-settings')}>
                            User Settings
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Sider>
        </div>
    );
}
