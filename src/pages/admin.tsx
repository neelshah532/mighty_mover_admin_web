//import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { FloatButton, Divider, Flex } from 'antd';
import { TERMS, COPYRIGHT } from '../assets/constant/constant';
import Loader from '../components/Loader';
//import Header_page from '../components/Header';
//import Sider_page from '../components/Sider_page';
import { Outlet } from 'react-router-dom';

const { Content: AntContent } = Layout;

const Admin: React.FC = () => {
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        const fetchdata = setTimeout(() => {
            setToggle(false);
        }, 0);

        return () => clearTimeout(fetchdata);
    }, []);

    return (
        <>
            {toggle ? (
                <Loader />
            ) : (
                <Layout className="w-full">
                    <Layout>
                        <AntContent className="bg-gray-50 mt-16 p-1">
                            <Outlet /> {/* Render nested routes */}
                            <Flex justify="space-between" className="ml-4 mr-4 text-gray-400">
                                <div className="hover:text-gray-600">{COPYRIGHT}</div>
                                <div className="hover:text-gray-600">{TERMS}</div>
                            </Flex>
                            <Divider />
                        </AntContent>
                    </Layout>
                    <FloatButton.BackTop />
                </Layout>
            )}
        </>
    );
};

export default Admin;
