import { Button, Card, Flex, Form, Input, Modal, Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
import http from '../http/http';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { VEHICLE_DATA_COL } from '../assets/constant/vehicle';
import { AlignType } from '../assets/dto/data.type';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { CANCEL, DELETE_CONFIRMATION, OK } from '../assets/constant/model';
import { useForm } from 'antd/es/form/Form';

export default function Vehicle() {
    const [loading, setLoading] = useState(false);
    const [vehicledata, setvehicledata] = useState([]);
    const [deleteModalVisible,setdeleteModalVisible]=useState(false)
    const [editmodalVisible,seteditmodalVisible]=useState(false)
    const [form]=useForm()
    const vehicle_data_col = [
        ...VEHICLE_DATA_COL,
        {
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: (_, record: city) => (
                <div className="flex gap-2 justify-center">
                    <div>
                        <button className="py-3 px-4 bg-blue-500 text-white rounded" onClick={()=>editclick(record)}>
                            <FaEdit />
                        </button>
                    </div>
                    <div>
                        <button className="py-3 px-4 bg-red-500 text-white rounded" onClick={()=>setdeleteModalVisible(true)}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ),
        },
    ];

    const editclick=(record:any)=>{
        seteditmodalVisible(true)
        form.setFieldsValue(record);

    }
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await http.get('/api/v1/driver/vehicle?limit=1');
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
    const handleDeleteConfirm=async()=>{
        // try{
        //     const response=await http.delete("")
        // }
    }

    const handleedit=async()=>{

    }
    
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <Card title="Vehicle" className="m-2">
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
                onCancel={()=>setdeleteModalVisible(false)}
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
            onCancel={()=>seteditmodalVisible(false)}
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
                        label="Vehicle No"
                        name="vehicle_num"
                        rules={[{ required: true, message: 'Please input City name!' }]}
                        className="w-full"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="vehicle_category"
                        rules={[{ required: true, message: 'Please add country name' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="order_type"
                        rules={[{ required: true, message: 'Please add country name' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="KM Charge"
                        name="per_km_charge"
                        rules={[{ required: true, message: 'Please add country name' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Max Weight"
                        name="max_weight"
                        rules={[{ required: true, message: 'Please add country name' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Length"
                        name="length"
                        rules={[{ required: true, message: 'Please add country name' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Width"
                        name="width"
                        rules={[{ required: true, message: 'Please add country name' }]}
                        className="w-full"
                    >
                        <Input className="w-full" />
                    </Form.Item>
                </Form>
                </Modal>
        </div>
    );
}
