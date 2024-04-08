import { useState } from "react"
import Sider from "antd/es/layout/Sider"
import { Menu } from "antd"
import { FaHome } from "react-icons/fa"
import {Badge} from "antd"
import { MdOutlineContactPage,MdOutlinePayment } from "react-icons/md"
import { FaRegUserCircle } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import { ORDER_TABLE } from "../assets/constant/constant"
import { Order } from "../assets/dto/data.type"
export default function Sider_page() {
    const [collapse, setcollapse] = useState(false);

   
    const data: Order[] = ORDER_TABLE;

  return (
    <div>
           <Sider
                        theme="light"
                        collapsed={collapse}
                        collapsedWidth={80}
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            // position: 'fixed',
                            left: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <Menu
                            className="mt-16"
                            theme="light"
                            triggerSubMenuAction="hover"
                            items={[
                                {
                                    label: 'Dashboard',
                                    key: 'Home',
                                    icon: <FaHome />,
                                },
                                {
                                    label: 'Order',
                                    key: 'order',
                                    icon: (
                                        <Badge count={data.length} size="small">
                                            <MdOutlineContactPage />{' '}
                                        </Badge>
                                    ),
                                },
                                {
                                    label: 'Delivery Partner',
                                    key: 'delivery',
                                    icon: <FaRegUserCircle />,
                                },
                                {
                                    label: 'Payment Details',
                                    key: 'payment',
                                    icon: <MdOutlinePayment />,
                                },
                                {
                                    label: 'Settings',
                                    key: 'settings',
                                    icon: <IoMdSettings />,
                                },
                            ]}
                        ></Menu>
                    </Sider>
    </div>
  )
}
