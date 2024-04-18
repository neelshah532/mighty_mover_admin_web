import { Button, Card, Flex, Form, Input, Modal, Spin, Table } from 'antd';
import http from '../http/http';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { CANCEL, DELETE_CONFIRMATION, OK } from '../assets/constant/model';
import { useForm } from 'antd/es/form/Form';
import { AlignType, city } from '../assets/dto/data.type';
import { CITY_DATA_COL } from '../assets/constant/city';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

function City() {
    const [citydata, setcitydata] = useState<city[]>([]);
    const [total, settotal] = useState(0);
    const [modal, setmodal] = useState(false);
    const [editmodal, seteditmodal] = useState(false);
    const [form] = useForm();
    const [editform] = useForm();
    const [editId, seteditId] = useState('');
    const [page, setpage] = useState<number>(1);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState('');
    const [loading,setloading]=useState(false)

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

    const handleDeleteConfirm = async () => {
        try {
            const response = await http.delete(`/api/v1/admin/city/${deleteItemId}`);
            console.log(response.data);
        setDeleteModalVisible(false);

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

    const crud_city_data = [
        ...CITY_DATA_COL,
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_, record) => (
                <Button
                    onClick={() => handleEnable(record.id)}
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
            render: (_, record: city) => (
                <div className="flex gap-2 justify-center">
                    <div>
                        <button onClick={() => editmodal_function(record, record.id)}>
                            <FaEdit />
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handleDelete(record.id)}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ),
        },
    ];

    const fetchData = async () => {
   
        setloading(true)
        try {
            const response = await http.get(`/api/v1/admin/city?limit=10&page=${page}`);
            setcitydata(response.data.data);
            settotal(response.data.total)
            setloading(false)
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
        finally{
            setloading(false)

        }
    };
    const handleEnable = async (id: string) => {
        try {
            const response = await http.patch(`/api/v1/admin/city/status/${id}`);
            console.log(response.data);

            fetchData();
            toast.success(response.data.message);
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
    const openmodal = () => {
        setmodal(!modal);
    };

    const editmodal_function = (record: city, id: string) => {
        seteditmodal(true);
        editform.setFieldsValue(record);
        seteditId(id);
    };

    const editmodal_function_api = async () => {
        try {
            const response = await http.patch(`/api/v1/admin/city/${editId}`, editform.getFieldsValue({}));
            console.log(response.data);
            seteditId('');
            seteditmodal(false);
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

    useEffect(() => {
        fetchData();
    }, [page]);

    const add_city = async () => {
        console.log(form);
        try {
            const add_city_response = await http.post('/api/v1/admin/city', form.getFieldsValue({}));
            toast.success(add_city_response.data.message);
            form.resetFields();
            openmodal();
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
    return (
        <div>
            <Card title="Cities" className="m-2">
                <div className="flex justify-end mb-2">
                    <Button type="primary" style={{ backgroundColor: '#2967ff' }} onClick={openmodal}>
                        Add City
                    </Button>
                </div>
                {loading ? (
                            <Flex gap="middle" className="w-full h-full justify-center ">
                                <Spin size="large" />
                            </Flex>
                        ) : (
                            <>
                <Table
                    rowClassName="text-center"
                    dataSource={citydata}
                    pagination={{ pageSize: 10, total: total }}
                    columns={crud_city_data}
                    onChange={(e) => setpage(e.current)}
                    bordered
                    sticky
                    className="w-full"
                ></Table>
                            </>
                        )}
            </Card>
            <Modal
                title="Add City"
                open={modal}
                onCancel={openmodal}
                footer={
                    <div className="flex gap-3 justify-end">
                        <Button onClick={openmodal}>{CANCEL}</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={add_city}
                            style={{ backgroundColor: '#2967ff' }}
                        >
                            {OK}
                        </Button>
                    </div>
                }
            >
                <Form form={form}>
                    <Form.Item
                        label="City Name"
                        name="city_name"
                        rules={[{ required: true, message: 'Please input City name!' }]}
                        className="w-full"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Country Name"
                        name="country_name"
                        rules={[{ required: true, message: 'Please add country name' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Edit City"
                open={editmodal}
                onOk={editmodal_function_api}
                onCancel={() => seteditmodal(false)}
            >
                <Form form={editform} autoComplete="off">
                    <Form.Item
                        label="City Name"
                        name="city_name"
                        rules={[{ required: true, message: 'Please input City name!' }]}
                        className="w-full"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Country Name"
                        name="country_name"
                        rules={[{ required: true, message: 'Please add country name' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Confirm Deletion"
                open={deleteModalVisible}
                onCancel={handleDeleteModalCancel}
                footer={
                    <div className="flex gap-3 justify-end">
                        <Button onClick={handleDeleteModalCancel}>{CANCEL}</Button>
                        <Button type="primary" htmlType="submit" onClick={handleDeleteConfirm}>
                            {OK}
                        </Button>
                    </div>
                }
            >
                <p>{DELETE_CONFIRMATION}</p>
            </Modal>
        </div>
    );
}

export default City;
