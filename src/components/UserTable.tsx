import { Button, Card, Flex, Form, Input, Modal, Spin, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { ColumnProps } from 'antd/es/table';
import { AlignType, RootState, User, addUsers } from '../assets/dto/data.type';

import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useForm } from 'antd/es/form/Form';
import { ADD_ITEM, ADD_USER, CANCEL, DELETE_BUTTON, DELETE_CONFIRMATION, EDIT_BUTTON } from '../assets/constant/model';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import http from '../http/http';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import { USER_DATA_COL } from '../assets/constant/constant';

// import Loader from './Loader';
type FieldType = {
    contact: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    // status?: string;
};

function CategoriePage() {
    //use redux to display name of page

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState('');
    //we have use useForm hook to get and set form value
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState(0);
    // const [enable, setEnable] = useState<boolean[]>([]);
    const [modal2Open, setModal2Open] = useState(false);
    const [addItem, setAddItem] = useState(false);
    const [CurrentEditValue, setCurrentEditValue] = useState('');
    const [loading, setLoading] = useState(false);
    // const [radioValue, setRadioValue] = useState<number>(0);
    const [form] = useForm();
    const [addForm] = useForm();
    const dispatch = useDispatch();
    const rolePermission = useSelector((state: RootState) => state.rolePermission.permission);

    console.log(rolePermission);
    const allowedPermission = (section: string, permissionType: string) => {
        return rolePermission?.some((role) => role.section === section && role.permission?.includes(permissionType));
    };
    const hasEditPermission = allowedPermission('blog', 'write');
    //    const statusPermission = allowedPermission('city', 'write');
    const hasDeletePermission = allowedPermission('blog', 'delete');
    const addItemPermission = allowedPermission('blog', 'write');

    const user_data_col: ColumnProps<User>[] = [
        ...USER_DATA_COL(currentPage, 10),
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_, record: User) => (
                <div className="flex justify-center">
                    <div
                        className={`${record.status === 'active' ? 'text-[#25a55e]  p-3 w-24  rounded-[5px]  bg-[#F2FCF7] border' : 'text-red-500 p-3 w-28  rounded-[5px]  bg-[#FDF4F5]'}  `}
                    >
                        {record.status}
                    </div>
                </div>
            ),
        },
    ];

    if (hasEditPermission || hasDeletePermission) {
        user_data_col.push({
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: (_, record: User) => (
                <div className="flex gap-2 justify-center">
                    {hasEditPermission && (
                        <div>
                            <button
                                onClick={() => handleEdit(record, record.id)}
                                className="  py-3 px-4 bg-blue-500 text-white  rounded"
                                // icon={<FaEdit />}
                            >
                                <FaEdit />
                            </button>
                        </div>
                    )}
                    {hasDeletePermission && (
                        <div>
                            <button
                                onClick={() => handleDelete(record.id)}
                                className="py-3 px-4 bg-red-500 text-white rounded"
                                // icon={<MdDelete />}
                            >
                                <MdDelete />
                            </button>
                        </div>
                    )}
                </div>
            ),
        });
    }

    // there is a handle addItem Permissions check

    // there is a HandleError component
    const handleError = (error: Error) => {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{
                status: number;
                message: string;
            }>;
            if (axiosError.response) {
                console.log('Response Error', axiosError.response);
                toast.error(axiosError.response.data.message);
            } else if (axiosError.request) {
                console.log('Request Error', axiosError.request);
            } else {
                console.log('Error', axiosError.message);
            }
        }
    };
    // const handleEnable = async (id: string, currentStatus: string) => {
    //     try {
    //         const changeStatus = currentStatus === 'active' ? 1 : 0;
    //         console.log('changed status:', changeStatus);
    //         console.log('Sending value:', changeStatus);
    //         const statusUpdate = await http.patch(`/api/v1/user-management/updateProfile/${id}`, {
    //             status: changeStatus,
    //         });
    //         console.log(statusUpdate.data.message);
    //         if (statusUpdate.status === 200) {
    //             toast.success(statusUpdate.data.message);
    //             console.log(statusUpdate.data.message);
    //             console.log(statusUpdate.data.data.status);
    //             fetchData(currentPage);
    //         } else {
    //             toast.error(statusUpdate.data.message);
    //         }
    //         //  fetchData();
    //     } catch (error) {
    //         handleError(error as Error);
    //     }
    // };

    const handleEdit = (record: User, id: string) => {
        setModal2Open(true);
        form.setFieldsValue(record);
        setCurrentEditValue(id);
    };
    // this const is used for update specific subcategories
    const handleUpdatedata = async () => {
        // console.log(setCurrentEditValue);
        setModal2Open(false);
        console.log(form.getFieldValue({}));
        try {
            const updateRecord = await http.patch(
                `/api/v1/user-management/updateProfile/${CurrentEditValue}`,
                form.getFieldsValue({})
            );
            toast.success(updateRecord.data.message);
            setCurrentEditValue('');
            form.resetFields();
            fetchData(currentPage);
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDelete = async (id: string) => {
        showDeleteModal(id);
    };

    // show delete confirm modal confirmation popup
    const showDeleteModal = (id: string) => {
        setDeleteItemId(id);
        setDeleteModalVisible(true);
    };

    // close delete confirmation modal
    const handleDeleteModalCancel = () => {
        setDeleteModalVisible(false);
    };

    // Function to confirm delete action
    const handleDeleteConfirm = async () => {
        try {
            const deleteRecord = await http.delete(`/api/v1/user-management/deleteProfile/${deleteItemId}`);
            console.log(deleteRecord.data);
            fetchData(currentPage);
            setDeleteModalVisible(false);
        } catch (error) {
            handleError(error as Error);
        }
    };
    //handle radioButton
    // const handleRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setRadioValue(parseInt(e.target.value));
    // };

    //handle add item
    const handleAdd = () => {
        setAddItem(true);
    };
    const handleAddItemModelClose = () => {
        form.resetFields();
        addForm.resetFields();
        setAddItem(false);
    };
    const handleAdditems = async (params: addUsers) => {
        console.log('Formdata:', params);

        // console.log('add item');
        // setAddItem(false);
        try {
            // console.log(radioValue);
            const res = await http.post('/api/v1/user-management/register', {
                first_name: params?.first_name,
                last_name: params?.last_name,
                email: params?.email,
                contact: params?.contact,
                password: params?.password,
            });

            if (res.status === 200) {
                toast.success(res.data.message);
                setAddItem(false);
                addForm.resetFields();
                fetchData(currentPage);
                console.log(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            handleError(error as Error);
        }
    };

    // their is a section where fetch data of categorie items using useState
    const [userDataTable, setuserDataTable] = useState<User[]>([]);

    // api calling section
    const fetchData = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const skip = (page - 1) * 10;
            const response = await http.get(`/api/v1/user-management/getAllUser?limit=10&offset=${skip}`);

            // console.log(response.data.data);
            setuserDataTable(response.data.data);
            // console.log(total);
            setCurrentPage(page);

            setTotal(response.data.total);
            setLoading(false);
        } catch (error) {
            handleError(error as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        dispatch(setPage('User Management'));
        void fetchData(currentPage);
    }, [dispatch, fetchData, currentPage]);

    return (
        <>
            <div>
                {/* {loading ? (
                    <Flex  gap="middle" className='w-full h-full justify-center '>
                        <Spin size="large" />
                    </Flex>
                ) : ( */}
                <>
                    <div className="flex justify-end mb-2">
                        {addItemPermission && (
                            <Button onClick={handleAdd} style={{ color: '#2967ff', backgroundColor: '#ffffff' }}>
                                +{ADD_USER}
                            </Button>
                        )}
                    </div>
                    {loading ? (
                        <Flex gap="middle" className="w-full h-full justify-center ">
                            <Spin size="large" />
                        </Flex>
                    ) : (
                        <>
                            <Card title="User page" className="m-2">
                                <Table
                                    rowClassName="text-center"
                                    dataSource={userDataTable}
                                    pagination={{
                                        pageSize: 10,
                                        total: total,
                                        current: currentPage,
                                        onChange: (page) => {
                                            fetchData(page);
                                        },
                                    }}
                                    // pagination={false}
                                    columns={user_data_col}
                                    // bordered
                                    sticky
                                    className="w-full"
                                ></Table>
                                {/* <Pagination
                                    current={currentPage}
                                    onChange={(page) => HandlePagination(page)}
                                    total={total}
                                    pageSize={10}
                                /> */}
                            </Card>
                        </>
                    )}
                </>
                {/* )} */}
                <Modal
                    title="Edit User"
                    centered
                    open={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => setModal2Open(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 3 }}
                        style={{ maxWidth: 600 }}
                        //   onFinish={onFinish}
                        //   onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="w-full"
                    >
                        <Form.Item<FieldType>
                            label="First Name"
                            name="first_name"
                            rules={[
                                { required: true, message: 'Please input your First Name!' },
                                { min: 3, message: 'First Name must be at least 3 characters' },
                                { max: 30, message: 'First Name not more than 30 characters' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Last Name"
                            name="last_name"
                            rules={[
                                { required: true, message: 'Please input your Last Name' },
                                { min: 3, message: 'Last Name must be at least 3 characters' },
                                { max: 30, message: 'Last Name not more than 30 characters' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter valid email address!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Contact Number"
                            name="contact"
                            validateTrigger="onBlur"
                            rules={[
                                { pattern: /^[0-9]*$/, message: 'Please input numbers only for contact!' },
                                { required: true, message: 'Please input your number!' },
                                { max: 10, message: 'contact number not more then 10 digit!' },
                                { min: 10, message: 'contact number must be 10 digit!', required: true },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <div className="flex gap-3 justify-end">
                            <Button onClick={() => setModal2Open(false)}>{CANCEL}</Button>
                            <Button onClick={handleUpdatedata}>{EDIT_BUTTON}</Button>
                        </div>
                    </Form>
                </Modal>
                <Modal title="Add User" open={addItem} onCancel={handleAddItemModelClose} footer={null}>
                    <Form form={addForm} onFinish={handleAdditems} autoComplete="off" className="w-full grid  gap-y-6 ">
                        <Form.Item<FieldType>
                            label="First Name"
                            name="first_name"
                            rules={[
                                { required: true, message: 'Please input your First Name!' },
                                { min: 3, message: 'First Name must be at least 3 characters' },
                                { max: 30, message: 'First Name not more than 30 characters' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Last Name"
                            name="last_name"
                            rules={[
                                { required: true, message: 'Please input your Last Name' },
                                { min: 3, message: 'Last Name must be at least 3 characters' },
                                { max: 30, message: 'Last Name not more than 30 characters' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter valid email address!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Contact Number"
                            name="contact"
                            rules={[
                                { pattern: /^[0-9]*$/, required: true, message: 'Please input your number!' },
                                // { type: 'number', message: 'Please enter valid contact number!' },
                                // {  },
                                { max: 10, message: 'contact number must be 10 digit!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Passwords"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { max: 16, message: 'password not more than 16 characters' },
                                { min: 8, message: 'password must be at least 8 characters' },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        {/* <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: 'Please select your status' }]}
                        >
                            <Radio.Group>
                                <Radio value={0}>active</Radio>
                                <Radio value={1}>inactive</Radio>
                            </Radio.Group>
                        </Form.Item> */}

                        <div className="flex gap-3 justify-end">
                            <Button onClick={handleAddItemModelClose}>{CANCEL}</Button>
                            <Button htmlType="submit">{ADD_ITEM}</Button>
                        </div>
                    </Form>
                </Modal>
                <Modal
                    title="Confirm Deletion"
                    open={deleteModalVisible}
                    onCancel={handleDeleteModalCancel}
                    footer={
                        <div className="flex gap-3 justify-end">
                            <Button onClick={handleDeleteModalCancel}>{CANCEL}</Button>
                            <Button onClick={handleDeleteConfirm}>{DELETE_BUTTON}</Button>
                        </div>
                    }
                >
                    <p>{DELETE_CONFIRMATION}</p>
                </Modal>
            </div>
        </>
    );
}

export default CategoriePage;
