import { Button, Card, Flex, Form, Input, Modal, Select, Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
import http from '../http/http';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
// import { VEHICLE_DATA_COL } from '../assets/constant/vehicle';
import { AlignType } from '../assets/dto/data.type';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { CANCEL, DELETE_CONFIRMATION, OK } from '../assets/constant/model';
import { useForm } from 'antd/es/form/Form';
import { DRIVER_DATA_COL } from '../assets/constant/driver_constant';

export default function DriverTable() {
    const [driverId, setDriverId] = useState('');
    const [loading, setLoading] = useState(false);
    const [vehicledata, setvehicledata] = useState([]);
    const [deleteModalVisible, setdeleteModalVisible] = useState(false)
    const [editmodalVisible, seteditmodalVisible] = useState(false)
    const [form] = useForm()
    const vehicle_data_col = [
        ...DRIVER_DATA_COL,
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            align: 'center' as AlignType,
            render: (_, record: User, index: number) => (
                <div>
                    <Button>
                        Active
                    </Button>
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: (_, record) => (
                <div className="flex gap-2 justify-center">
                    <div>
                        <button className="py-3 px-4 bg-blue-500 text-white rounded" onClick={() => editclick(record)}>
                            <FaEdit />
                        </button>
                    </div>
                    <div>
                        <button className="py-3 px-4 bg-red-500 text-white rounded" onClick={() => deleteDriver(record)}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ),
        },
    ];


    const deleteDriver = (record) => {
        setdeleteModalVisible(true)
        setDriverId(record.id)
    }

    const editclick = (record: any) => {
        seteditmodalVisible(true)
        form.setFieldsValue(record);
    }
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await http.get('/api/v1/driver?limit=10');
            toast.success(response.data.message);
            setvehicledata(response.data.data);
            console.log(response.data.data);
            setLoading(false);
        } catch (error) {
            message_error(error);
        } finally {
            setLoading(false);
        }
    };
    const message_error = (error: any) => {
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
    const handleDeleteConfirm = async () => {
        setLoading(true)
        try{
            const response = await http.delete(`api/v1/driver/deleteAccount/${driverId}`)
            toast.success(response.data.message)
            setLoading(false)
        }
         catch (error) {
        message_error(error);
    } finally {
        setLoading(false);
        setdeleteModalVisible(false)
    }
    }

    const handleedit = async () => {
        
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <Card title="Driver" className="m-2">
                {loading ? (
                    <Flex gap="middle" className="w-full h-full justify-center ">
                        <Spin size="large" />
                    </Flex>
                ) : (
                    <>
                        <Table
                            rowClassName="text-center"
                            dataSource={vehicledata}
                            pagination={{ pageSize: 10 }}
                            columns={vehicle_data_col}
                            bordered
                            sticky
                            className="w-full"
                        ></Table>
                    </>
                )}
            </Card>

            <Modal
                title="Confirm Deletion"
                open={deleteModalVisible}
                onCancel={() => setdeleteModalVisible(false)}
                footer={
                    <div className="flex gap-3 justify-end">
                        <Button type="primary" htmlType="submit" onClick={handleDeleteConfirm}>
                            {OK}
                        </Button>
                    </div>
                }
            >
                <p>{DELETE_CONFIRMATION}</p>
            </Modal>
            <Modal
                title="Edit Vehicle"
                open={editmodalVisible}
                onCancel={() => seteditmodalVisible(false)}
                footer={
                    <div className="flex gap-3 justify-end">
                        <Button type="primary" htmlType="submit" onClick={handleedit}>
                            {OK}
                        </Button>
                    </div>
                }
            >
                <Form form={form}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                        className="w-full"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please add email' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Contact"
                        name="contact"
                        rules={[{ required: true, message: 'Please add contact' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Shift"
                        name="shift"
                        rules={[{ required: true, message: 'Please add shift' }]}
                        className="w-full"
                    >
                        {/* <Input className="w-full" /> */}
                        <Select>
                            <Select.Option value="day">Day</Select.Option>
                            <Select.Option value="night">Night</Select.Option>
                            <Select.Option value="both">Both</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
