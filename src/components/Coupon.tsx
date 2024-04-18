import { Button, Card, DatePicker, Flex, Form, Input, Modal, Radio, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { CANCEL, DELETE_CONFIRMATION, OK } from '../assets/constant/model';
import { useForm } from 'antd/es/form/Form';
import http from '../http/http';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { COUPON_DATA_COL } from '../assets/constant/coupon';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { AlignType, coupon } from '../assets/dto/data.type';
import dayjs from 'dayjs';

export default function Coupon() {
    const [modal, setmodal] = useState(false);
    const [form] = useForm();
    const [editform] = useForm();

    const [coupondata, setcoupondata] = useState([]);
    const [editId, seteditId] = useState('');
    const [editmodal, seteditmodal] = useState(false);
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

    const editmodal_function = (record: coupon, id: string) => {
        seteditmodal(true);
        editform.setFieldsValue({ ...record, expiry_date: dayjs(record.expiry_date) });
        seteditId(id);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await http.delete(`/api/v1/coupons/${deleteItemId}`);
            toast.success(response.data.message);
            setDeleteModalVisible(false);

            fetchData();
        } catch (error) {
            message_error(error);
        }
    };

    const coupon_col_data = [
        ...COUPON_DATA_COL,
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_, record) => (
                <Button className={record.status === 'Active' ? 'text-green-500' : 'text-red-500'}>
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
                        <button 
                        className="py-3 px-4 bg-blue-500 text-white rounded"
                        onClick={() => editmodal_function(record, record.id)}>
                            <FaEdit />
                        </button>
                    </div>
                    <div>
                        <button
                         className="py-3 px-4 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(record.id)}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ),
        },
    ];
    const openmodal = () => {
        setmodal(!modal);
    };
    const message_error = (error: any) => {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{
                status: number;
                message: string;
            }>;
            if (axiosError.response) {
                toast.error(axiosError.response.data.message);
            } else if (axiosError.request) {
                console.log('Request Error', axiosError.request);
            } else {
                console.log('Error', axiosError.message);
            }
        }
    };

    const handleadd = async () => {
        try {
            const response = await http.post('/api/v1/coupons', form.getFieldsValue({}));
            toast.success(response.data.message);
            form.resetFields();
            openmodal();
        } catch (error) {
            message_error(error);
        }
    };
    const fetchData = async () => {
        setloading(true)
        try {
            const response = await http.get('/api/v1/coupons');
            setcoupondata(response.data.data);
            console.log(response.data);
            setloading(false)
        } catch (error) {
            message_error(error);
        }
        finally{
            setloading(false)
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleedit = async () => {
        try {
            const response = await http.patch(`/api/v1/coupons/${editId}`, editform.getFieldsValue({}));
            console.log(response.data.data);
            fetchData();
            seteditmodal(false);
        } catch (error) {
            message_error(error);
        }
    };

    return (
        <div>
            <Card title="Coupons" className="m-2">
                <div className="flex justify-end mb-2">
                    <Button type="primary" style={{ backgroundColor: '#2967ff' }} onClick={openmodal}>
                        Add Coupon
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
                            dataSource={coupondata}
                            pagination={{ pageSize: 10 }}
                            columns={coupon_col_data}
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
                            style={{ backgroundColor: '#2967ff' }}
                            onClick={handleadd}
                        >
                            {OK}
                        </Button>
                    </div>
                }
            >
                <Form form={form}>
                    <Form.Item
                        label="Coupon code"
                        name="coupon_code"
                        rules={[{ required: true, message: 'Please input Coupon name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please add description' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Vehicle Type"
                        name="coupon_type"
                        rules={[{ required: true, message: 'Please add vehicle type' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Discount Type"
                        name="discount_type"
                        rules={[{ required: true, message: 'Please add discount type' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Discount Value"
                        name="discount_value"
                        rules={[{ required: true, message: 'Please add discount value' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Expiry Date"
                        name="expiry_date"
                        rules={[{ required: true, message: 'Please add discount value' }]}
                        className="w-full"
                    >
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Max Usage"
                        name="max_usage_count"
                        rules={[{ required: true, message: 'Please add discount value' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="statustype"
                        rules={[{ required: true, message: 'Please select your status' }]}
                    >
                        <Radio.Group>
                            <Radio value={0} onClick={() => console.log(0)}>
                                Active
                            </Radio>
                            <Radio value={1} onClick={() => console.log(1)}>
                                Inactive
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Edit Coupon" open={editmodal} onCancel={() => seteditmodal(false)} onOk={handleedit}>
                <Form form={editform}>
                    <Form.Item
                        label="Coupon code"
                        name="coupon_code"
                        rules={[{ required: true, message: 'Please input Coupon name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please add description' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Vehicle Type"
                        name="coupon_type"
                        rules={[{ required: true, message: 'Please add vehicle type' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Discount Type"
                        name="discount_type"
                        rules={[{ required: true, message: 'Please add discount type' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Discount Value"
                        name="discount_value"
                        rules={[{ required: true, message: 'Please add discount value' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Expiry Date"
                        name="expiry_date"
                        rules={[{ required: true, message: 'Please add discount value' }]}
                        className="w-full"
                    >
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Max Usage"
                        name="max_usage_count"
                        rules={[{ required: true, message: 'Please add discount value' }]}
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
