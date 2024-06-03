import { Button, Card, Flex, Form, Input, Modal, Radio, Spin, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { ColumnProps } from 'antd/es/table';
import { AlignType, Categories, RootState, addCategories } from '../assets/dto/data.type';
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
import usePermission from '../hook/usePermission';

type FieldType = {
    id: number;
    name?: string;
    description?: string;
    // status?: string;
};

function CategoriePage() {
    const { hasEditPermission, statusPermission, hasDeletePermission, addItemPermission } = usePermission('categories');
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState('');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState(0);

    const [modal2Open, setModal2Open] = useState(false);
    const [addItem, setAddItem] = useState(false);
    const [CurrentEditValue, setCurrentEditValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const [form] = useForm();
    const [addForm] = useForm();
    const dispatch = useDispatch();

    const [categoriesData, setCategoriesData] = useState<Categories[]>([]);
    console.log('hasEditPermission', hasEditPermission);
    const cetagories_data_col: ColumnProps<Categories>[] = [
        ...CETAGORIES_DATA_COL(currentPage, 10),
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
        {
            title: 'Action',
            key: 'action',
            hidden: !hasEditPermission && !hasDeletePermission,
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
        },
    ];

    // cetagories_data_col.push();

    // there is a handle addItem Permissions check
    // const addItemPermission = rolePermission?.some(
    //     (role) =>
    //         role.section === 'categories' && role.permission?.includes('create')
    // );

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
                fetchData(currentPage);
            } else {
                toast.error(statusUpdate.data.message);
            }
            //  fetchData();
        } catch (error) {
            handleError(error as Error);
        }
    };

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
            const deleteRecord = await http.delete(`/api/v1/Categories/${deleteItemId}`);
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
        setAddItem(false);
    };
    const handleAdditems = async (params: addCategories) => {
        console.log('Formdata:', params);

        // console.log('add item');
        // setAddItem(false);
        try {
            // console.log(radioValue);
            const res = await http.post('/api/v1/Categories', {
                name: params?.name,
                description: params?.description,
                status: params?.status,
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

    // api calling section
    const fetchData = useCallback(
        async (page: number) => {
            setLoading(true);
            try {
                const skip = (page - 1) * 10;
                const response = await http.get(`/api/v1/Categories?limit=10&offset=${skip}`);
                // console.log(currentPage);
                // console.log(response.data.data);
                setCategoriesData(response.data.data);
                // console.log(total);
                setCurrentPage(page);
                toast.success(response.data.message);

                setTotal(response.data.total);
                setLoading(false);
            } catch (error) {
                handleError(error as Error);
            } finally {
                setLoading(false);
            }
        },
        [currentPage]
    );

    useEffect(() => {
        dispatch(setPage('Category'));
        void fetchData(currentPage);
    }, [dispatch, fetchData, currentPage]);

    // this is for search data

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setSearch(e.target.value);
    };

    const filteredData = search
        ? categoriesData.filter((searchdata) => {
              const { name } = searchdata;
              const query = search.toLowerCase();
              return name.toLowerCase().includes(query);
          })
        : categoriesData;

    return (
        <>
            <div>
                {/* {loading ? (
                    <Flex  gap="middle" className='w-full h-full justify-center '>
                        <Spin size="large" />
                    </Flex>
                ) : ( */}
                <>
                    <div className="w-full flex justify-end mb-2 gap-2">
                        <div>
                            <Input.Search placeholder="Search By Name" onChange={handleSearch} style={{ width: 300 }} />
                        </div>
                        {addItemPermission && (
                            <Button onClick={handleAdd} style={{ color: '#2967ff', backgroundColor: '#ffffff' }}>
                                +{ADD_ITEM}
                            </Button>
                        )}
                    </div>
                    {loading ? (
                        <Flex gap="middle" className="w-full h-full justify-center ">
                            <Spin size="large" />
                        </Flex>
                    ) : (
                        <>
                            <Card title="Categories page" className="m-2">
                                <Table
                                    rowClassName="text-center"
                                    dataSource={filteredData}
                                    pagination={{
                                        pageSize: 10,
                                        total: total,
                                        current: currentPage,
                                        onChange: (page) => {
                                            fetchData(page);
                                        },
                                    }}
                                    // pagination={false}
                                    columns={cetagories_data_col}
                                    // bordered
                                    sticky
                                    className="w-full"
                                ></Table>
                                {/* <Pagination
                                    current={currentPage}
                                    onChange={(page) => fetchData(page)}
                                    total={total}
                                    pageSize={10}
                                /> */}
                            </Card>
                        </>
                    )}
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
            </div>
        </>
    );
}

export default CategoriePage;
