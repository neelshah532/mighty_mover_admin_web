'use client';
// import { useState } from 'react';
import Sider from 'antd/es/layout/Sider';
import { Button, Flex, Menu } from 'antd';
// import { FaHome } from 'react-icons/fa';
// import { Badge } from 'antd';
// import { MdOutlineContactPage, MdOutlinePayment } from 'react-icons/md';
// import { FaRegUserCircle } from 'react-icons/fa';
// import { IoMdSettings } from 'react-icons/io';
import {  SIDE_PANEL } from '../assets/constant/constant';
// import { Order } from '../assets/dto/data.type';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { useState } from 'react';
import logo from '../assets/Images/Group 1.svg';
// import Item from 'antd/es/list/Item';

export default function Sider_page() {
    // const [collapse, setCollapse] = useState(false);
    // const data: Order[] = ORDER_TABLE;
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
        <div className='h-screen sticky top-0'>
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
                    transition: 'all 0.3s ease',
                }}
                className="shadow-sm shadow-gray-400 "
            >
                <Flex className='mt-4' gap={collapse ? 0 : 10}>
                    {/*
                    {toggle1 ? (
                        <></>
                    ) : ( */}
                    <div className="">
                        <img src={logo} alt="logo" style={{ transition: 'all 0.3s ease', }} className={collapse ? 'hidden' : 'block ml-1'} />
                    </div>
                    <div className={collapse ? 'w-full flex justify-center' : ''}>
                        <Button
                            className={collapse ? 'mr-0 text-xl border-none shadow-sm' : 'mr-1 text-xl border-none shadow-sm'}
                            onClick={handletoggle}
                        >
                            {collapse ? (<IoArrowBack className='rotate-180 text-center transition ease-linear duration-300' />) : (<IoArrowBack className=' transition ease-linear duration-300' />)}
                        </Button>
                    </div>
                </Flex>
                <Menu className="mt-16" theme="light" triggerSubMenuAction="hover" mode="inline" defaultSelectedKeys={['Home']}>
                    {/* <Menu.Item key="Home" icon={<FaHome />} onClick={() => navigate('/')} >
                        Dashboard
                    </Menu.Item>
                    <Menu.Item
                        key="order"
                        icon={<MdOutlineContactPage />}
                        onClick={() => navigate('/orders')}
                    >
                        Order
                    </Menu.Item>
                    <Menu.Item key="delivery" icon={<FaRegUserCircle />} onClick={() => navigate('/delivery-partner')}>
                        Delivery Partner
                    </Menu.Item>
                    <Menu.Item key="payment" icon={<MdOutlinePayment />} onClick={() => navigate('/payments')}>
                        Payment Details
                    </Menu.Item> */}
                    {/* {SIDE_PANEL.map(val)=>(
                    <>
                        <Menu.Item key={val.key} icon={val.icon} onClick={() => navigate(val.navigate)}>
                            {val.name}
                        </Menu.Item>
                    </>
                    )} */}
                    {
                        SIDE_PANEL.menu.map((val)=>(
                            <>
                                <Menu.Item key={val.key} icon={val.icon} onClick={() => navigate(val.navigate)}>
                                    {val.name}
                                </Menu.Item> 
                            </>
                        ))
                    }

                    {/* <Menu.SubMenu key="settings" title="Settings" icon={<IoMdSettings />}>
                        <Menu.Item key="setting" onClick={() => navigateToSettings('email-verification')}>
                            Email Verification
                        </Menu.Item>
                        <Menu.Item key="setting1" onClick={() => navigateToSettings('blog-settings')}>
                            Blog Settings
                        </Menu.Item>
                        <Menu.Item key="setting2" onClick={() => navigateToSettings('user-settings')}>
                            User Settings
                        </Menu.Item>
                    </Menu.SubMenu> */}
                    <Menu.SubMenu key={SIDE_PANEL.submenu_key} title={SIDE_PANEL.submenu_title} icon={SIDE_PANEL.icon}>
                        {SIDE_PANEL.submenu.map((item)=>(
                            <>
                                <Menu.Item key={item.key} icon={item.icon} onClick={()=> navigateToSettings(item.navigate)}>
                                    {item.name}
                                </Menu.Item>
                            </>
                        ))}
                    </Menu.SubMenu>
                </Menu>
            </Sider>
        </div>
    );
}
