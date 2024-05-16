import { Button, Form, Input, Modal, Radio, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SUBCATEGORIES_DATA_COL } from '../assets/constant/categories';
import http from '../http/http';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { AlignType, Categories, RootState, addCategories } from '../assets/dto/data.type';
import { ColumnProps } from 'antd/es/table';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useForm } from 'antd/es/form/Form';
import { ADD_ITEM, BACK_BUTTON, CANCEL, DELETE, DELETE_CONFIRMATION, OK } from '../assets/constant/model';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/pageSlice';

const SubCategory = () => {
    //use redux to display name of page
    const dispatch = useDispatch();

    //this is id is fetch param from url
    const params = useParams();
    const [form] = useForm();
    const [addForm] = useForm();
    const navigate = useNavigate();
    const [modal2Open, setModal2Open] = useState(false);
    const [addItem, setAddItem] = useState(false);
    const [CurrentEditValue, setCurrentEditValue] = useState('');
    // const [statusId, setStatusId] = useState('');
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState('');
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const rolePermission = useSelector((state: RootState) => state.rolePermission.permission);

    console.log(rolePermission);
    const allowedPermission = (section: string, permissionType: string) => {
        return rolePermission?.some((role) => role.section === section && role.permission?.includes(permissionType));
    };
    const superadminPermission = useSelector((state) => state.user.user.is_super_admin);
    console.log('superadminPermission', superadminPermission);
    
    const hasEditPermission = superadminPermission || allowedPermission('categories', 'write');
    const statusPermission = superadminPermission || allowedPermission('categories', 'write');
    const hasDeletePermission = superadminPermission || allowedPermission('categories', 'delete');
    const addItemPermission = superadminPermission || allowedPermission('categories', 'create');

    const subcetagories_data_col: ColumnProps<Categories>[] = [
        ...SUBCATEGORIES_DATA_COL(currentPage, 10),
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
                        onClick={() => handleEnable(record.id, String(record.status))}
                        className={`${record.status === 'active' ? 'text-green-500' : 'text-red-500'}  `}
                    >
                        {record.status}
                    </Button>
                );
            },
        },
    ];
    if (hasEditPermission || hasDeletePermission) {
        subcetagories_data_col.push({
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: (_, record: Categories) => (
                <div className="flex gap-2 justify-center">
                    {hasEditPermission && (
                        <div>
                            <button
                                onClick={() => handleEdit(record, record.id)}
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

    // there is a handle addItem Permissions check

    //handle status change of subcategories
    const handleEnable = async (id: string, currentStatus: string) => {
        // setStatusId(id);
        try {
            const changeStatus = currentStatus === 'active' ? 1 : 0;
            console.log('changed status:', changeStatus);
            console.log('Sending value:', changeStatus);
            const statusUpdate = await http.patch(`/api/v1/subcategories/${id}/?category_id=${params.id}`, {
                status: changeStatus,
            });
            console.log(statusUpdate.data.message);
            console.log(id);
            if (statusUpdate.status === 200) {
                toast.success(statusUpdate.data.message);
                console.log(statusUpdate.data.message);
                console.log(statusUpdate.data.data.status);
                fetchData(currentPage);
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

    // THIS CONST is use for handle edit form
    const handleEdit = (record: Categories, id: string) => {
        setModal2Open(true);
        // console.log(id);
        setCurrentEditValue(id);

        // console.log(CurrentEditValue);
        form.setFieldsValue(record);
    };

    // this const is used for update specific subcategories
    const handleUpdatedata = async () => {
        // console.log(setCurrentEditValue);
        setModal2Open(false);
        try {
            const updateRecord = await http.patch(
                `/api/v1/subcategories/${CurrentEditValue}/?category_id=${params.id}`,
                form.getFieldsValue({})
            );
            toast.success(updateRecord.data.message);
            setCurrentEditValue('');
            fetchData(currentPage);
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

    // this const is used for delete specific subcategories
    // const handleDelete = async (id: string) => {
    //     const deleteRecord = await http.delete(`/api/v1/subcategories/${params.id}/${id}`);
    //     console.log(deleteRecord.data);
    //     fetchData();
    // };
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
            const deleteRecord = await http.delete(`/api/v1/subcategories/${deleteItemId}/?category_id=${params.id}`);
            console.log(deleteRecord.data);
            fetchData(currentPage);
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

    // handle to open add-subcategory model
    const handleAdd = () => {
        setAddItem(true);
    };

    /// handle to close add-subcategory model
    const handleAddItemModelClose = () => {
        setAddItem(false);
    };

    // handle to add-subcategory model to add subcategories

    const handleAdditems = async (addparams: addCategories) => {
        // console.log('add item');
        console.log('Formdata:', addparams);
        // setAddItem(false);
        try {
            const res = await http.post(`/api/v1/subcategories/?category_id=${params.id}`, {
                name: addparams?.name,
                description: addparams?.description,
                status: addparams?.status,
            });
            console.log(res);
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

    // create fetchData function to fetch data from api
    const fetchData = useCallback(
        async (page: number) => {
            // setLoading(true);
            try {
                const skip = (page - 1) * 10;
                const response = await http.get(
                    `api/v1/subcategories/?category_id=${params.id}&limit=10&offset=${skip}`
                );
                // const data = await response.json();
                // console.log(response);
                setCategoriesData(response.data.data);
                setTotal(response.data.total);
                setCurrentPage(page);
                // setLoading(false);
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
            // finally {
            //     setLoading(false);
            // }
        },
        [params.id]
    );

    //use effect to load api
    useEffect(() => {
        dispatch(setPage('SubCategory'));
        void fetchData(currentPage);
    }, [fetchData, dispatch, currentPage]);

    //handle to back a categories page
    const handleBack = () => {
        navigate('/categories');
    };

    const [categoriesData, setCategoriesData] = useState<Categories[]>([]);
    return (
        <>
            {/* <Card title="SubCategory page" className="m-2"> */}
            <div className="flex justify-end mb-4 gap-5">
                <div className=" ">
                    <Button onClick={handleBack} style={{ color: '#2967ff', backgroundColor: '#ffffff' }}>
                        {BACK_BUTTON}
                    </Button>
                </div>
                <div className="">
                    {addItemPermission && (
                        <Button onClick={handleAdd} style={{ color: '#2967ff', backgroundColor: '#ffffff' }}>
                            +{ADD_ITEM}
                        </Button>
                    )}
                </div>
            </div>

            <Table
                rowClassName="text-center"
                dataSource={categoriesData}
                pagination={{
                    pageSize: 10,
                    total: total,
                    current: currentPage,
                    onChange: (page) => {
                        fetchData(page);
                    },
                }}
                columns={subcetagories_data_col}
                // bordered
                sticky
                className="w-full rounded-lg shadow-lg
                    "
            ></Table>
            {/* </Card> */}
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
                    autoComplete="off"
                    className="w-full "
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: false, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: false, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <div className="flex gap-3 justify-end">
                        <Button onClick={() => setModal2Open(false)}>{CANCEL}</Button>
                        <Button onClick={handleUpdatedata}>{OK}</Button>
                    </div>
                </Form>
            </Modal>

            {/* modal for add subcategory  */}

            <Modal title="Add SubCategory" open={addItem} onCancel={handleAddItemModelClose} footer={null}>
                <Form form={addForm} onFinish={handleAdditems} autoComplete="off" className="w-full ">
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
                        <Radio.Group>
                            <Radio value={0}>active</Radio>
                            <Radio value={1}>inactive</Radio>
                        </Radio.Group>
                    </Form.Item>

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
                        <Button onClick={handleDeleteConfirm}>{DELETE}</Button>
                    </div>
                }
            >
                <p>{DELETE_CONFIRMATION}</p>
            </Modal>
        </>
    );
};

export default SubCategory;
