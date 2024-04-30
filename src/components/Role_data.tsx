import { Button, Card, Flex, Input, Modal, Spin, Table, Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import http from '../http/http';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { ROLE_DATA_COL } from '../assets/constant/role_data';
import { AlignType, role_data } from '../assets/dto/data.type';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { CANCEL, DELETE_CONFIRMATION, OK } from '../assets/constant/model';
import { ColumnProps } from 'antd/es/table';
// import { CheckboxValueType } from 'antd/es/checkbox/Group';

export default function Role_data() {
    const [roledata, setroledata] = useState([]);
    const [loading, setloading] = useState(false);
    const [editmodal, seteditmodal] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const navigate = useNavigate();
    const [form] = useForm();
    const [permissions, setPermissions] = useState({});
    const [deleteid, setdeletedid] = useState('');
    const STAFF_DATA = [
        { section: 'Dashboard' },
        { section: 'Order' },
        { section: 'Payment' },
        { section: 'Delivery Partner' },
        { section: 'Categories' },
        { section: 'City' },
        { section: 'Coupon' },
        { section: 'Blog' },
        { section: 'Vehicle' },
        { section: 'Staff Management' },
        { section: 'Order Settings' },
        { section: 'Blog Settings' },
        { section: 'User Settings' },
    ];

    const onFinish = (values: role_data) => {
        const formattedData = {
            role_name: values.role_name,
            description: values.description,
            permissions: Object.entries(permissions).map(([section, permission]) => ({
                section,
                section_permission: permission,
            })),
        };

        console.log('Formatted data:', formattedData);

        form.resetFields();
        setPermissions({});
    };
    // const handlePermissionChange = (section: string, permission: role_data) => {
    //     setPermissions((prevPermissions) => ({
    //         ...prevPermissions,
    //         [section]: permission,
    //     }));
    // };
    const handleedit = (id: string) => {
        seteditmodal(!editmodal);
        fetch_indi_data(id);
    };
    const fetch_indi_data = async (id: string) => {
        try {
            const response = await http.get(`/api/v1/admin/role/${id}`);
            console.log(response.data.data);
            form.setFieldsValue({
                role_name: response.data.data.name,
                description: response.data.data.description,
                permission: response.data.data.permission,
            });
        } catch (error) {
            message_error(error as Error);
        }
    };

    const role_data_col: ColumnProps<role_data>[] = [
        ...ROLE_DATA_COL,
        {
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: (_, record: role_data) => (
                <div className="flex gap-2 justify-center">
                    <div>
                        <button
                            className="py-3 px-4 bg-blue-500 text-white rounded"
                            onClick={() => handleedit(record.id)}
                        >
                            <FaEdit />
                        </button>
                    </div>
                    <div>
                        <button
                            className="py-3 px-4 bg-red-500 text-white rounded"
                            onClick={() => handledelete(record.id)}
                        >
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ),
        },
    ];

    const handledelete = (id: string) => {
        setDeleteModalVisible(true);
        setdeletedid(id);
    };
    const delete_role_api = async () => {
        try {
            const response = await http.delete(`/api/v1/admin/role/${deleteid}`);
            toast.success(response.data.message);
        } catch (error) {
            message_error(error as Error);
        }
    };
    const fetchData = useCallback(async () => {
        setloading(true);
        try {
            const response = await http.get('/api/v1/admin/role');
            setroledata(response.data.data);
            console.log(response.data.data);
            setloading(false);
        } catch (error) {
            message_error(error as Error);
        } finally {
            setloading(false);
        }
    }, []);
    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    const message_error = (error: Error) => {
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
    const handlenav = () => {
        navigate('/staff-management/role-management/add');
    };
    return (
        <div>
            <div>
                <div className="flex justify-end mb-2">
                    <Button style={{ backgroundColor: '#ffffff', color: '#2967ff' }} onClick={handlenav}>
                        + Add New Role
                    </Button>
                </div>
                {loading ? (
                    <Flex gap="middle" className="w-full h-full justify-center ">
                        <Spin size="large" />
                    </Flex>
                ) : (
                    <>
                        <Card title="Cities" className="m-2">
                            <Table
                                rowClassName="text-center"
                                dataSource={roledata}
                                pagination={{ pageSize: 10 }}
                                columns={role_data_col}
                                bordered
                                sticky
                                className="w-full"
                            ></Table>
                        </Card>
                    </>
                )}

                <Modal title="Edit Role" open={editmodal} onCancel={() => seteditmodal(false)} width={1000}>
                    <Form form={form} onFinish={onFinish} className="w-full flex flex-col">
                        <Form.Item
                            rules={[{ required: true, message: 'Please add Name' }]}
                            label="Role Name "
                            name="role_name"
                            className="w-[502px] flex flex-col gap-2"
                        >
                            <Input placeholder="Add Role Name" className="py-2 placeholder:text-xs" />
                        </Form.Item>
                        <Form.Item
                            rules={[{ required: true, message: 'Please add description' }]}
                            label="Description"
                            name="description"
                            className="w-full flex flex-col gap-2"
                        >
                            <Input.TextArea
                                className="border-2 border-gray-300 py-2 placeholder:text-xs"
                                placeholder="Add Role Description"
                            />
                        </Form.Item>
                        <table className="w-full  text-center">
                            <thead className="text-2xl">
                                <tr>
                                    <th className="border-2">Index</th>
                                    <th className="border-2">Section</th>
                                    <th className="border-2">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {STAFF_DATA.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-2">{index + 1}</td>
                                        <td className="border-2">{item.section}</td>
                                        <td className="border-2">
                                            <div className="flex justify-center">
                                               
                                                <Form.Item
                                                    name="permission"
                                                    className="w-full flex flex-col gap-2 p-2 "
                                                >
                                                    {/* <Checkbox.Group
                                                        onChange={(checkedValues: CheckboxValueType[]) =>
                                                            void handlePermissionChange(item.section, checkedValues)
                                                        }
                                                    >
                                                        <Checkbox value="view">View</Checkbox>
                                                        <Checkbox value="add">Add</Checkbox>
                                                        <Checkbox value="edit">Edit</Checkbox>
                                                        <Checkbox value="delete">Delete</Checkbox>
                                                    </Checkbox.Group> */}
                                                </Form.Item>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Form.Item></Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="Confirm Deletion"
                    open={deleteModalVisible}
                    onCancel={() => setDeleteModalVisible(false)}
                    footer={
                        <div className="flex gap-3 justify-end">
                            <Button onClick={() => setDeleteModalVisible(false)}>{CANCEL}</Button>
                            <Button type="primary" htmlType="submit" onClick={delete_role_api}>
                                {OK}
                            </Button>
                        </div>
                    }
                >
                    <p>{DELETE_CONFIRMATION}</p>
                </Modal>
            </div>
        </div>
    );
}
