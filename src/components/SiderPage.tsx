import Sider from 'antd/es/layout/Sider';
import { Menu } from 'antd';
import { SIDE_PANEL } from '../assets/constant/constant';
import { useLocation, useNavigate } from 'react-router-dom';
// import { IoArrowBack } from 'react-icons/io5';
import { useEffect } from 'react';
import logo from '../assets/Images/Group 1.svg';
import { useSelector } from 'react-redux';
interface Role {
    id: string;
    name: string;
    permission: { section: string; permission: string[] }[];
}
interface RolePermissionState {
    roles: Role[];
}

interface RootState {
    rolePermission: RolePermissionState;
}

interface MenuItem {
    name: string;
    navigate: string;
    icon: JSX.Element;
}import NavLogo from '../assets/Images/icons/Navlogo';

export default function SiderPage({ collapse }: { collapse: boolean }) {
    // const data: Order[] = ORDER_TABLE;
    // const [toggle1, settoggle1] = useState(false);
    useEffect(() => {
        window.location.pathname;
    }, []);

    // const [collapse, setcollapse] = useState(false);
    const { rolePermission } = useSelector((state: RootState) => state);
    console.log(rolePermission);

    const navigate = useNavigate();
    const location = useLocation();

    const filteredMenu: MenuItem[] = SIDE_PANEL.menu.filter((item) => {
        return rolePermission.roles.some((role: Role) => {
            return role.permission.some((permission) => {
                console.log(role.permission);
                return permission.section === item.name.toLowerCase();
            });
        });
    });
    return (
        <div className="h-screen sticky top-0">
            <Sider
                theme="light"
                collapsed={collapse}
                collapsedWidth={0}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                {/* <Flex className="mt-4" gap={collapse ? 0 : 10}> */}
                {/* <div className={collapse ? 'w-full flex justify-center' : ''}>
                            <Button
                                className={
                                    collapse
                                        ? 'mr-0 text-xl border-none shadow-sm'
                                        : 'mr-1 text-xl border-none shadow-sm'
                                }
                                onClick={handletoggle}
                            >
                                {collapse ? (
                                    <IoArrowBack className="rotate-180 text-center transition ease-linear duration-300" />
                                ) : (
                                    <IoArrowBack className=" transition ease-linear duration-300" />
                                )}
                            </Button>
                        </div> */}
                {/* </Flex> */}
                <div className="flex justify-center mt-4">
                    <div className="">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <Menu
                    className="mt-3"
                    theme="light"
                    triggerSubMenuAction="hover"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                >
                    {filteredMenu.map((item) => (
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
