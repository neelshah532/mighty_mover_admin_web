    import Sider from 'antd/es/layout/Sider';
    import { Button, Flex, Menu } from 'antd';
    import { SIDE_PANEL } from '../assets/constant/constant';
    import { useNavigate } from 'react-router-dom';
    import { IoArrowBack } from 'react-icons/io5';
    import { useEffect, useState } from 'react';
    import logo from '../assets/Images/Group 1.svg';

    export default function Sider_page() {
        // const data: Order[] = ORDER_TABLE;
        // const [toggle1, settoggle1] = useState(false);
        useEffect(() => {
            window.location.pathname
        }, [])

        const [collapse, setcollapse] = useState(false);
        const navigate = useNavigate();
        const handletoggle = () => {
            setcollapse(!collapse);
        };
        // const navigateToSettings = (key: string) => {
        //     navigate(`/setting/${key}`);
        // };
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
                    // className={collapse ? 'hidden' : 'shadow-md'}
                    className='shadow-md shadow-gray-400'
                >
                    <Flex className='mt-4' gap={collapse ? 0 : 10}>
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
                    <Menu className="mt-5" theme="light" triggerSubMenuAction="hover" mode="inline" selectedKeys={[location.pathname]}>
                        {SIDE_PANEL.menu.map((item) => (
                                <Menu.Item key={item.navigate} icon={item.icon} onClick={() => navigate(item.navigate)}>
                                    {item.name}
                                </Menu.Item>
                            ))}
                        <Menu.SubMenu key={SIDE_PANEL.submenu_key} title={SIDE_PANEL.submenu_title} icon={SIDE_PANEL.icon}>
                            {SIDE_PANEL.submenu.map((item) => (
                                <Menu.Item key={item.navigate} icon={item.icon} onClick={() => navigate(item.navigate)}>
                                    {item.name}
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    </Menu>
                </Sider>
            </div>
        );
    }