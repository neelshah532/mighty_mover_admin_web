import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import Order_page from '../components/Order_page';
import { FloatButton, Divider, Flex } from 'antd';

import { TERMS, COPYRIGHT } from '../assets/constant/constant';

import Loader from '../components/Loader';
import Settings from '../components/Settings';
import Blog from '../components/Blog';
import Payment_page from '../components/Payment_page';
import Delivery_partner from '../components/Delivery_partner';
import Header_page from '../components/Header';
import Sider_page from '../components/Sider_page';
import Dashboard from '../components/Dashboard';
import UserPage from '../components/UserTable';

const Admin: React.FC = () => {
    const [toggle, settoggle] = useState(true);

    useEffect(() => {
        const fetchdata = setTimeout(() => {
            settoggle(false);
        }, 0);

        return () => clearTimeout(fetchdata);
    }, []);

    return (
        <>
            {toggle ? (
                <Loader />
            ) : (
                <div
                    className="w-full "
                    style={
                        {
                            // overflow: 'auto',
                            // height: '100vh',
                            // overflowY: 'hidden',
                        }
                    }
                >
                    <Layout className="w-full ">
                        <Header_page />
                        <Layout>
                            <Sider_page />
                            <Content className="bg-gray-50 mt-16 p-1">
                                <div>
                                    <Dashboard />
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
                                <Divider />
                                <div>
                                    <Blog />
                                </div>
                                <div>
                                    <UserPage/>
                                </div>
                                <div>
                                    <Delivery_partner />
                                </div>
                                <Flex justify="space-between" className="ml-4 mr-4  text-gray-400">
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
