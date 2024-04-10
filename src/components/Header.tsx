import { Tooltip, Flex, Modal, Upload, Avatar, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
// import { IoMenu } from 'react-icons/io5';
// import { BiLogOut } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
// import logo from '../assets/Images/Group 1.svg';
import { useState, useEffect, ChangeEventHandler } from 'react';
// import { Header } from 'antd/es/layout/layout';
import ImgCrop from 'antd-img-crop';
import { RiLockPasswordLine } from 'react-icons/ri';
// import { POPOVER_LOGOUT } from '../assets/constant/constant';
import type { GetProp, UploadProps, UploadFile } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { TiArrowSortedDown } from 'react-icons/ti';

// import { ORDER_TABLE } from '../assets/constant/constant';
// import { Order } from '../assets/dto/data.type';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function Header_page() {
    // const [collapse, setcollapse] = useState(false);
    const [name, setname] = useState('');
    const [toggle1, settoggle1] = useState(false);
    const [toggle, settoggle] = useState(true);

    // const [loading, setLoading] = useState(false);
    // const [pic, setpic] = useState(false);
    const [pic, setPic] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        const fetchdata = setTimeout(() => {
            settoggle(false);
        }, 0);

        return () => clearTimeout(fetchdata);
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
        message.success('You have been logged out');
    };

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    // const getBase64 = (img: FileType, callback: (url: string) => void) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result as string));
    //     reader.readAsDataURL(img);
    // };

    // const beforeUpload = (file: FileType) => {
    //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //     if (!isJpgOrPng) {
    //         message.error('You can only upload JPG/PNG file!');
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //         message.error('Image must smaller than 2MB!');
    //     }
    //     return isJpgOrPng && isLt2M;
    // };
    // const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    //     setFileList(newFileList);
    // };
    const handleOk = () => {
        // setpic(true);
        message.info(`Update Success`);
        settoggle1(true);
        setIsModalOpen(false);
    };
    // const handleChange: UploadProps['onChange'] = (info) => {
    //     if (info.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         getBase64(info.file.originFileObj as FileType, (url) => {
    //             setLoading(false);
    //             setImageUrl(url);
    //         });
    //     }
    // };

    const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
        const allowedTypes = ['image/jpeg', 'image/png']; // Define allowed image types
        const maxSize = 2 * 1024 * 1024; // Define max size in bytes (2MB)

        // Check if any file exceeds the maximum allowed size or is of an invalid type
        const isInvalidFile = fileList.some(
            (file) => file.size && (file.size > maxSize || (file.type && !allowedTypes.includes(file.type)))
        );

        if (isInvalidFile) {
            // If any file is invalid, show an error message to the admin
            message.error('Invalid file! Please make sure the file is a JPEG or PNG image and does not exceed 2MB.');
        } else {
            // Otherwise, update the file list and set the profile picture
            setFileList(fileList);
            if (fileList.length > 0 && fileList[0].originFileObj) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPic(e.target?.result as string);
                };
                reader.readAsDataURL(fileList[0].originFileObj);
            } else {
                setPic(null);
            }
        }
    };

    const beforeUpload = (file: FileType) => {
        const allowedTypes = ['image/jpeg', 'image/png']; // Define allowed image types
        const maxSize = 2 * 1024 * 1024; // Define max size in bytes (2MB)

        // Check if the file type is allowed and if it exceeds the maximum allowed size
        if (!allowedTypes.includes(file.type)) {
            message.error('You can only upload JPG/PNG files!');
            return false;
        }
        if (file.size > maxSize) {
            message.error('Image must be smaller than 2MB!');
            return false;
        }
        return true;
    };
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleUsernameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setname(e.target.value);
    };
    const menu = (
        <Menu className="">
            <Menu.Item key="0" onClick={() => setIsModalOpen(true)}>
                Profile
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1" onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="w-full sticky top-0 z-10">
            {/* <Header  className="z-10 w-full bg-white shadow-sm shadow-gray-400 border-2 border-red-500"> */}
            <Flex justify="space-between" className="bg-white shadow-md">
                <div></div>
                <Flex className="h-16" gap="small" align="center">
                    {/* <Avatar
                                        src={pic || <UserOutlined />}
                                        icon={!pic ? <FaUser /> : undefined}
                                        className="rounded-full"
                                    /> */}

                    {/* <Button
                                    className="text-white font-semibold bg-black text-xl text-center mt-5"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    {fileList.length === 0 ? (
                                        <FaUser />
                                    ) : (
                                        <Avatar
                                            size="large"
                                            src={pic || <UserOutlined />}
                                            icon={!pic ? <FaUser /> : undefined}
                                            className=""
                                            alt="avatar"

                                        />
                                    )}
                                </Button> */}

                    <div className="flex items-center gap-3 mr-1">
                        <Tooltip
                            title={
                                toggle1 ? (
                                    <div className="flex  items-center">
                                        {name} <img src={imageUrl} width={50} height={50} alt="avatar" />
                                    </div>
                                ) : (
                                    <div>{'ADMIN'}</div>
                                )
                            }
                        >
                            <div className="">
                                {fileList.length === 0 ? (
                                    <Avatar className="" size="large" icon={<UserOutlined />} alt="avatar" />
                                ) : (
                                    <Avatar
                                        className=""
                                        size="large"
                                        src={pic || <UserOutlined />}
                                        icon={!pic ? <FaUser /> : undefined}
                                        alt="avatar"
                                        onClick={() => setIsModalOpen(true)}
                                    />
                                )}
                            </div>
                        </Tooltip>
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                            <Flex vertical>
                                {/* <Upload
                                                    name="avatar"
                                                    listType="picture-card"
                                                    className="avatar-uploader "
                                                    showUploadList={false}
                                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                    beforeUpload={beforeUpload}
                                                    onChange={handleChange}
                                                >
                                                    {imageUrl ? (
                                                        <img src={imageUrl} alt="avatar" width={100} height={100} />
                                                    ) : (
                                                        uploadButton
                                                    )}
                                                </Upload> */}
                                <ImgCrop rotationSlider aspectSlider>
                                    <Upload
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        listType="picture-card"
                                        className="avatar-uploader "
                                        fileList={fileList}
                                        onChange={handleUploadChange}
                                        onPreview={onPreview}
                                        beforeUpload={beforeUpload}
                                    >
                                        {fileList.length < 1 && <div>{<PlusOutlined />}</div>}

                                        {/* <img src={imageUrl} alt="avatar" width={100} height={100} /> */}
                                    </Upload>
                                </ImgCrop>

                                <Input
                                    size="large"
                                    placeholder="Username"
                                    prefix={<UserOutlined />}
                                    value={name}
                                    onChange={handleUsernameChange}
                                />
                                <br></br>
                                <Input size="large" placeholder="Password" prefix={<RiLockPasswordLine />} />
                                <br></br>
                                <div className="flex justify-end mt-4">
                                    <Button onClick={handleCancel}>Cancel</Button>
                                    <Button type="primary" onClick={handleOk} className="bg-blue-500 hover:bg-blue-600">
                                        OK
                                    </Button>
                                </div>
                            </Flex>
                        </Modal>

                        {/* <Tooltip title={POPOVER_LOGOUT}> */}
                        {/* <Button className="text-xl mr-2" onClick={handleLogout} danger>
                                <BiLogOut className="" />
                            </Button> */}
                        <Dropdown overlay={menu} trigger={['click']} className="text-xl mr-2 " placement="bottom">
                            <a className="ant-dropdown-link " onClick={(e) => e.preventDefault()}>
                                <TiArrowSortedDown />
                            </a>
                        </Dropdown>
                        {/* </Tooltip> */}
                    </div>
                </Flex>
            </Flex>
            {/* </Header> */}
        </div>
    );
}
