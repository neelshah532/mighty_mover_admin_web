
import { FloatButton, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderPage from './HeaderPage';
import SiderPage from '../components/SiderPage';
import { useState } from 'react';

const { Content } = Layout;

const FixedLayout: React.FC = () => {
    const [collapse, setcollapse] = useState(false);
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <SiderPage collapse={collapse} />
                <Layout className="site-layout">
                    <HeaderPage collapse={collapse} setcollapse={setcollapse} />
                    <Content style={{ margin: '0 16px', marginTop: 16 }}>
                        <div>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
                <FloatButton.BackTop />
            </Layout>

            {/*  <div
                className="w-full "
                style={
                    {
                        // overflow: 'auto',
                        //height: '100vh',
                        // overflowY: 'hidden',
                    }
                }
            >
                <Layout className="w-full ">
                    <Header_page />
                    <Layout>
                        <Sider_page />
                        <Content className="bg-gray-50 mt-16 p-10">
                            <Outlet />
                        </Content>
                    </Layout>
                    <FloatButton.BackTop />
                </Layout>
            </div>
            
            ------------------------------------------------------------------
            //demo for styling purposes

            <Layout style={{ minHeight: '100vh' }}>
                <Header_page />
            <Layout className="site-layout">
            <Sider_page />
                <Content style={{ margin: '0 16px', marginTop: 16 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout> 
            
            */}
        </>
    );
};

export default FixedLayout;
