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
    const [toggle1, settoggle1] = useState(false);
    const [collapse, setcollapse] = useState(false);
    const navigate = useNavigate(); // Import useNavigate from react-router-dom
    const handletoggle = () => {
        setcollapse(!collapse);
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
                <Flex className='mt-2' gap={collapse ? 0 : 10}>
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
                <Menu
                    className="mt-8"
                    theme="light"
                    triggerSubMenuAction="hover"
                    items={[
                        {
                            label: 'Dashboard',
                            key: 'Home',
                            icon: <FaHome />,
                            onClick: () => navigate('/'),
                            
                        },
                        {
                            label: 'Order',
                            key: 'order',
                            icon: (
                                <Badge count={data.length} size="small">
                                    <MdOutlineContactPage />{' '}
                                </Badge>
                            ),
                            onClick: () => navigate('/orders'),
                        },
                        {
                            label: 'Delivery Partner',
                            key: 'delivery',
                            icon: <FaRegUserCircle />,
                            onClick: () => navigate('/delivery-partner'),
                        },
                        {
                            label: 'Payment Details',
                            key: 'payment',
                            icon: <MdOutlinePayment />,
                            onClick: () => navigate('/payments'),
                        },
                        
                        {
                            label: 'Settings',
                            key: 'settings',
                            icon: <IoMdSettings />,
                            onClick: () => navigate('/settings'),
                        },
                    ]}
                ></Menu>
            </Sider>
        </div>
    );
}
