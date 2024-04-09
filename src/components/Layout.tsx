
import { FloatButton, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header_page from '../components/Header';
import Sider_page from '../components/Sider_page';

const { Content } = Layout;

const FixedLayout: React.FC = () => {
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider_page />
                <Layout className="site-layout">
                    <Header_page />
                    <Content style={{ margin: '0 16px', marginTop: 16 }}>
                        <div >
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
                {/*< FloatButton.BackTop /> */}
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
