import { Button, Card, Flex, Form, Input, Modal, Spin, Table } from 'antd';
import http from '../http/http';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useCallback, useEffect, useState } from 'react';
import { ADD_ITEM, CANCEL, DELETE, DELETE_CONFIRMATION } from '../assets/constant/model';
import { useForm } from 'antd/es/form/Form';
import { AlignType, RootState, city } from '../assets/dto/data.type';
import { CITY_DATA_COL } from '../assets/constant/city';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import { ColumnProps } from 'antd/es/table';

function City() {
    const [citydata, setcitydata] = useState<city[]>([]);
    const [total, settotal] = useState(0);
    const [modal, setmodal] = useState(false);
    const [editmodal, seteditmodal] = useState(false);
    const [form] = useForm();
    const [editform] = useForm();
    const [editId, seteditId] = useState('');
    // const [page, setpage] = useState<number>(1);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState('');
    const [loading, setloading] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const dispatch = useDispatch();
    // const rolePermission = useSelector((state: RootState) => state.rolePermission.roles[0].permission);
    const rolePermission = useSelector((state: RootState) => state.rolePermission.permission);

    console.log(rolePermission);
const allowedPermission = (section: string, permissionType: string) => {
    return rolePermission?.some((role) => role.section === section && role.permission?.includes(permissionType));
};
    const hasEditPermission = allowedPermission("city","write")
    const statusPermission = allowedPermission('city', 'write');
    const hasDeletePermission = allowedPermission('city', 'delete');
    const addItemPermission = allowedPermission('city', 'create');

    const crud_city_data: ColumnProps<city>[] = [
        ...CITY_DATA_COL(currentPage, 10),
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_, record) => {
               
                if (!statusPermission) {
                    return (
                        <div className="flex justify-center">
                            <div
                                className={`${record.status === 'active' ? 'text-[#25a55e]  p-3 w-28  rounded-[5px]  bg-[#F2FCF7]' : 'text-red-500 p-3 w-28  rounded-[5px]  bg-[#FDF4F5]'}  `}
                            >
                                {record.status}
                            </div>
                        </div>
                    );
                }

                return (
                    <Button
                        onClick={() => handleEnable(record.id)}
                        className={record.status === 'active' ? 'text-green-500' : 'text-red-500'}
                    >
                        {record.status}
                    </Button>
                );
            },
        },
    ];
    if (hasEditPermission || hasDeletePermission) {
        crud_city_data.push({
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: (_, record: city) => (
                <div className="flex gap-2 justify-center">
                    {hasEditPermission && (
                        <div>
                            <button
                                onClick={() => editmodal_function(record, record.id)}
                                className="py-3 px-4 bg-blue-500 text-white rounded"
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
                            >
                                <MdDelete />
                            </button>
                        </div>
                    )}
                </div>
            ),
        });
    }
  

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

            fetchData(currentPage);
        } catch (error) {
            handleError(error as Error);
        }
    };

    const fetchData = useCallback(async (page: number) => {
        setloading(true);
        try {
            const skip = (page - 1) * 10;
            const response = await http.get(`/api/v1/admin/city?limit=10&offset=${skip}`);
            setcitydata(response.data.data);
            setCurrentPage(page);
            settotal(response.data.total);
            setloading(false);
        } catch (error) {
            handleError(error as Error);
        } finally {
            setloading(false);
        }
    }, []);
    const handleEnable = async (id: string) => {
        try {
            const response = await http.patch(`/api/v1/admin/city/status/${id}`);
            console.log(response.data);

            fetchData(currentPage);
            toast.success(response.data.message);
        } catch (error) {
            handleError(error as Error);
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
            fetchData(currentPage);
        } catch (error) {
            handleError(error as Error);
        }
    };
    useEffect(() => {
        dispatch(setPage('City'));
        void fetchData(currentPage);
    }, [dispatch, fetchData, currentPage]);

    const add_city = async () => {
        console.log(form);
        try {
            const add_city_response = await http.post('/api/v1/admin/city', form.getFieldsValue({}));
            toast.success(add_city_response.data.message);
            form.resetFields();
            openmodal();
            fetchData(currentPage);
        } catch (error) {
            handleError(error as Error);
        }
    };
    return (
        <div>
            {addItemPermission && (
                <div className="flex justify-end mb-2">
                    <Button style={{ backgroundColor: '#ffffff', color: '#2967ff' }} onClick={openmodal}>
                        + Add City
                    </Button>
                </div>
            )}
            {loading ? (
                <Flex gap="middle" className="w-full h-full justify-center ">
                    <Spin size="large" />
                </Flex>
            ) : (
                <>
                    <Card title="Cities" className="m-2">
                        <Table
                            rowClassName="text-center"
                            dataSource={citydata}
                            pagination={{
                                pageSize: 10,
                                total: total,
                                current: currentPage,
                                onChange: (page) => {
                                    fetchData(page);
                                },
                            }}
                            columns={crud_city_data}
                            // bordered
                            sticky
                            className="w-full"
                        ></Table>
                    </Card>
                </>
            )}
            <Modal
                title="Add City"
                open={modal}
                onCancel={openmodal}
                footer={
                    <div className="flex gap-3 justify-end">
                        <Button onClick={openmodal}>{CANCEL}</Button>
                        <Button htmlType="submit" onClick={add_city} style={{ backgroundColor: '#2967ff' }}>
                            {ADD_ITEM}
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
                        <Button onClick={handleDeleteConfirm}>{DELETE}</Button>
                    </div>
                }
            >
                <p>{DELETE_CONFIRMATION}</p>
            </Modal>
        </div>
    );
}

export default City;
