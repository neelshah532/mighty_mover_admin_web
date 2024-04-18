import { Button, Card, Flex, Form, Input, Modal, Radio, Spin, Table } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { ColumnProps } from 'antd/es/table';
import { AlignType, Categories } from '../assets/dto/data.type';
import { CETAGORIES_DATA_COL } from '../assets/constant/categories';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useForm } from 'antd/es/form/Form';
import { ADD_ITEM, CANCEL, DELETE, DELETE_CONFIRMATION, EDIT_ITEM } from '../assets/constant/model';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import http from '../http/http';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';
// import Loader from './Loader';

function CategoriePage() {
    type FieldType = {
        id: number;
        name?: string;
        description?: string;
        // status?: string;
    };
    //use redux to display name of page
    const dispatch = useDispatch();
   
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState('');
    //we have use useForm hook to get and set form value
    const [form] = useForm();
    const [addForm] = useForm();

    // const [enable, setEnable] = useState<boolean[]>([]);
    const [modal2Open, setModal2Open] = useState(false);
    const [addItem, setAddItem] = useState(false);
    const [CurrentEditValue, setCurrentEditValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [radioValue, setRadioValue] = useState<number>(0);
    // const categories_page = Categories_page;
    const cetagories_data_col: ColumnProps<Categories>[] = [
        ...CETAGORIES_DATA_COL,
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_, record) => (
                <Button
                    onClick={() => handleEnable(record.id, String(record.status))}
                    className={record.status === 'active' ? 'text-green-500' : 'text-red-500'}
                >
                    {record.status}
                </Button>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: (_, record: Categories) => (
                <div className="flex gap-2 justify-center">
                    <div>
                        <button
                            onClick={() => handleEdit(record, record.id)}
                            className="py-3 px-4 bg-blue-500 text-white rounded"
                        >
                            <FaEdit />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => handleDelete(record.id)}
                            className="py-3 px-4 bg-red-500 text-white rounded"
                        >
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ),
        },
    ];
    const handleEnable = async (id: string, currentStatus: string) => {
        try {
            const changeStatus = currentStatus === 'active' ? 1 : 0;
            console.log('changed status:', changeStatus);
            console.log('Sending value:', changeStatus);
            const statusUpdate = await http.patch(`/api/v1/Categories/${id}`, {
                status: changeStatus,
            });
            console.log(statusUpdate.data.message);
            if (statusUpdate.status === 200) {
                toast.success(statusUpdate.data.message);
                console.log(statusUpdate.data.message);
                console.log(statusUpdate.data.data.status);
                fetchData();
            } else {
                toast.error(statusUpdate.data.message);
            }
            //  fetchData();
        } catch (error) {
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
        }
    };

    // const handleEnable = (index: number) => {
    //     setEnable((prevEnable) => {
    //         const updatedEnable = [...prevEnable];
    //         updatedEnable[index] = !updatedEnable[index];
    //         return updatedEnable;
    //     });
    // };
    const handleEdit = (record: Categories, id: string) => {
        setModal2Open(true);
        form.setFieldsValue(record);
        setCurrentEditValue(id);
    };
    // this const is used for update specific subcategories
    const handleUpdatedata = async () => {
        // console.log(setCurrentEditValue);
        setModal2Open(false);
        try {
            const updateRecord = await http.patch(`/api/v1/Categories/${CurrentEditValue}`, form.getFieldsValue({}));
            toast.success(updateRecord.data.message);
            setCurrentEditValue('');
            fetchData();
        } catch (error) {
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
            const deleteRecord = await http.delete(`/api/v1/Categories/${deleteItemId}`);
            console.log(deleteRecord.data);
            fetchData();
            setDeleteModalVisible(false);
        } catch (error) {
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
        }
    };
    //handle radioButton
    const handleRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(e.target.value);
    };

    //handle add item
    const handleAdd = () => {
        setAddItem(true);
    };
    const handleAddItemModelClose = () => {
        setAddItem(false);
    };
    const handleAdditems = async () => {
        // console.log('add item');
        // setAddItem(false);
        try {
            const res = await http.post('/api/v1/Categories', { ...addForm.getFieldsValue(), status: radioValue });
            console.log(res);
            console.log(res.data.data.status);
            if (res.status === 200) {
                toast.success(res.data.message);
                setAddItem(false);
                addForm.resetFields();

                fetchData();
                console.log(res.data.data);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
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
        }
    };

    // their is a section where fetch data of categorie items using useState
    const [categoriesData, setCategoriesData] = useState<Categories[]>([]);

    // api calling section
    useEffect(() => {
        dispatch(setPage('Category'));
        fetchData();
    }, [dispatch]);
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await http.get('api/v1/Categories');
            // const data = await response.json();
            console.log(response.data.data);
            setCategoriesData(response.data.data);
            setLoading(false);
        } catch (error) {
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
        } finally {
            setLoading(false);
        }
    }, []);
    return (
        <>
            <div>
                {/* {loading ? (
                    <Flex  gap="middle" className='w-full h-full justify-center '>
                        <Spin size="large" />
                    </Flex>
                ) : ( */}
                <>
                    <Card title="Categories page" className="m-2">
                        <div className="flex justify-end mb-2">
                            <Button type="primary" onClick={handleAdd} style={{ backgroundColor: '#2967ff' }}>
                                {ADD_ITEM}
                            </Button>
                        </div>
                        {loading ? (
                            <Flex gap="middle" className="w-full h-full justify-center ">
                                <Spin size="large" />
                            </Flex>
                        ) : (
                            <Table
                                rowClassName="text-center"
                                dataSource={categoriesData}
                                pagination={{ pageSize: 5 }}
                                columns={cetagories_data_col}
                                onChange={(e) => console.log(e)}
                                // bordered
                                sticky
                                className="w-full"
                            ></Table>
                        )}
                    </Card>
                </>
                {/* )} */}
                <Modal
                    title="Edit Category"
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
                        className="w-full "
                    >
                        <Form.Item<FieldType>
                            label="Name"
                            name="name"
                            rules={[{ required: false, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Description"
                            name="description"
                            rules={[{ required: false, message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <div className="flex gap-3 justify-end">
                            <Button onClick={() => setModal2Open(false)}>{CANCEL}</Button>
                            <Button onClick={handleUpdatedata}>{EDIT_ITEM}</Button>
                        </div>
                    </Form>
                </Modal>
                <Modal title="Add Category" open={addItem} onCancel={handleAddItemModelClose} footer={null}>
                    <Form form={addForm} autoComplete="off" className="w-full ">
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please add description of your categories!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: 'Please select your status' }]}
                        >
                            <Radio.Group value={radioValue} onChange={handleRadioButton} defaultValue={0}>
                                <Radio value={0} onClick={() => console.log(0)}>
                                    Active
                                </Radio>
                                <Radio value={1} onClick={() => console.log(1)}>
                                    Inactive
                                </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <div className="flex gap-3 justify-end">
                            <Button onClick={handleAddItemModelClose}>{CANCEL}</Button>
                            <Button onClick={handleAdditems}>{ADD_ITEM}</Button>
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
                            <Button onClick={handleDeleteConfirm}>{DELETE}</Button>
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
