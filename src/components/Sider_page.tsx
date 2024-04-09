'use client'
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
import {  useNavigate } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import { useState } from 'react';

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
        <div className="shadow-sm shadow-gray-400">
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
                }}
            >
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
                <Menu
                    className="mt-16"
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
