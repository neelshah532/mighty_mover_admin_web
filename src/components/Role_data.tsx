// import { Button, Card, Checkbox, Flex, Input, Modal, Spin, Table, Form } from 'antd';
// import { useEffect, useState } from 'react';
// import http from '../http/http';
// import { toast } from 'sonner';
// import axios, { AxiosError } from 'axios';
// import { ROLE_DATA_COL } from '../assets/constant/role_data';
// import { AlignType } from '../assets/dto/data.type';
// import { MdDelete } from 'react-icons/md';
// import { FaEdit } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'antd/es/form/Form';
// import { CANCEL, DELETE_CONFIRMATION, OK } from '../assets/constant/model';

import Table, { ColumnProps } from 'antd/es/table';
import { role_data } from '../assets/dto/data.type';
import { ROLE_DATA_COL } from '../assets/constant/role_data';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { AlignType } from '../assets/dto/data.type';
import { Button, Card, Checkbox, Form, Input, Modal } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import http from '../http/http';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useForm } from 'antd/es/form/Form';
import { CANCEL, DELETE_CONFIRMATION, OK } from '../assets/constant/model';

// export default function Role_data() {
//     const [roledata, setroledata] = useState([]);
//     const [loading, setloading] = useState(false);
//     const [editmodal, seteditmodal] = useState(false);
//     const [deleteModalVisible, setDeleteModalVisible] = useState(false);
//     const navigate = useNavigate();
//     const [form] = useForm();
//     const [permissions, setPermissions] = useState({});
//     const [deleteid, setdeletedid] = useState('');
//     const STAFF_DATA = [
//         { section: 'Dashboard' },
//         { section: 'Order' },
//         { section: 'Payment' },
//         { section: 'Delivery Partner' },
//         { section: 'Categories' },
//         { section: 'City' },
//         { section: 'Coupon' },
//         { section: 'Blog' },
//         { section: 'Vehicle' },
//         { section: 'Staff Management' },
//         { section: 'Order Settings' },
//         { section: 'Blog Settings' },
//         { section: 'User Settings' },
//     ];

//     const onFinish = (values) => {
//         const formattedData = {
//             role_name: values.role_name,
//             description: values.description,
//             permissions: Object.entries(permissions).map(([section, permission]) => ({
//                 section,
//                 section_permission: permission,
//             })),
//         };

//         console.log('Formatted data:', formattedData);

//         form.resetFields();
//         setPermissions({});
//     };
//     const handlePermissionChange = (section: string, permission) => {
//         setPermissions((prevPermissions) => ({
//             ...prevPermissions,
//             [section]: permission,
//         }));
//     };
//     const handleedit = (id: string) => {
//         seteditmodal(!editmodal);
//         fetch_indi_data(id);
//     };
//     const fetch_indi_data = async (id: string) => {
//         try {
//             const response = await http.get(`/api/v1/admin/role/${id}`);
//             console.log(response.data.data);
//             form.setFieldsValue({
//                 role_name: response.data.data.name,
//                 description: response.data.data.description,
//                 permission: response.data.data.permission,
//             });
//         } catch (error) {
//             message_error(error);
//         }
//     };

//     const role_data_col = [
//         ...ROLE_DATA_COL,
//         {
//             title: 'Action',
//             key: 'action',
//             align: 'center' as AlignType,
//             render: (_, record: any) => (
//                 <div className="flex gap-2 justify-center">
//                     <div>
//                         <button
//                             className="py-3 px-4 bg-blue-500 text-white rounded"
//                             onClick={() => handleedit(record.id)}
//                         >
//                             <FaEdit />
//                         </button>
//                     </div>
//                     <div>
//                         <button
//                             className="py-3 px-4 bg-red-500 text-white rounded"
//                             onClick={() => handledelete(record.id)}
//                         >
//                             <MdDelete />
//                         </button>
//                     </div>
//                 </div>
//             ),
//         },
//     ];

//     const handledelete = (id: string) => {
//         setDeleteModalVisible(true);
//         setdeletedid(id);
//     };
//     const delete_role_api = async () => {
//         try {
//             const response = await http.delete(`/api/v1/admin/role/${deleteid}`);
//             toast.success(response.data.message);
//         } catch (error) {
//             message_error(error);
//         }
//     };
//     const fetchData = async () => {
//         setloading(true);
//         try {
//             const response = await http.get('/api/v1/admin/role');
//             setroledata(response.data.data);
//             console.log(response.data.data);
//             setloading(false);
//         } catch (error) {
//             message_error(error);
//         } finally {
//             setloading(false);
//         }
//     };
//     useEffect(() => {
//         fetchData();
//     }, []);

//     const message_error = (error: any) => {
//         if (axios.isAxiosError(error)) {
//             const axiosError = error as AxiosError<{
//                 status: number;
//                 message: string;
//             }>;
//             if (axiosError.response) {
//                 toast.error(axiosError.response.data.message);
//             } else if (axiosError.request) {
//                 console.log('Request Error', axiosError.request);
//             } else {
//                 console.log('Error', axiosError.message);
//             }
//         }
//     };
//     const handlenav = () => {
//         navigate('/staff-management/role-management/add');
//     };
//     return (
//         <div>
//             <div>
//                 <div className="flex justify-end mb-2">
//                     <Button style={{ backgroundColor: '#ffffff', color: '#2967ff' }} onClick={handlenav}>
//                         + Add New Role
//                     </Button>
//                 </div>
//                 {loading ? (
//                     <Flex gap="middle" className="w-full h-full justify-center ">
//                         <Spin size="large" />
//                     </Flex>
//                 ) : (
//                     <>
//                         <Card title="Cities" className="m-2">
//                             <Table
//                                 rowClassName="text-center"
//                                 dataSource={roledata}
//                                 pagination={{ pageSize: 10 }}
//                                 columns={role_data_col}
//                                 bordered
//                                 sticky
//                                 className="w-full"
//                             ></Table>
//                         </Card>
//                     </>
//                 )}

//                 <Modal title="Edit Role" open={editmodal} onCancel={() => seteditmodal(false)} width={1000}>
//                     <Form form={form} onFinish={onFinish} className="w-full flex flex-col">
//                         <Form.Item
//                             rules={[{ required: true, message: 'Please add Name' }]}
//                             label="Role Name "
//                             name="role_name"
//                             className="w-[502px] flex flex-col gap-2"
//                         >
//                             <Input placeholder="Add Role Name" className="py-2 placeholder:text-xs" />
//                         </Form.Item>
//                         <Form.Item
//                             rules={[{ required: true, message: 'Please add description' }]}
//                             label="Description"
//                             name="description"
//                             className="w-full flex flex-col gap-2"
//                         >
//                             <Input.TextArea
//                                 className="border-2 border-gray-300 py-2 placeholder:text-xs"
//                                 placeholder="Add Role Description"
//                             />
//                         </Form.Item>
//                         <table className="w-full  text-center">
//                             <thead className="text-2xl">
//                                 <tr>
//                                     <th className="border-2">Index</th>
//                                     <th className="border-2">Section</th>
//                                     <th className="border-2">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="text-sm">
//                                 {/* {STAFF_DATA.map((item, index) => (
//                                         <tr key={index}>
//                                             <td className="border-2">{index + 1}</td>
//                                             <td className="border-2">{item.section}</td>
//                                             <td className="border-2">
//                                                 <div className="flex justify-center">
//                                                     <Form.Item
//                                                         name="permission"
//                                                         className="w-full flex flex-col gap-2 p-2 "
//                                                     >
//                                                         <Checkbox.Group
//                                                             onChange={(checkedValues) =>
//                                                                 handlePermissionChange(item.section, checkedValues)
//                                                             }
//                                                         >
//                                                             <Checkbox value="view">View</Checkbox>
//                                                             <Checkbox value="add">Add</Checkbox>
//                                                             <Checkbox value="edit">Edit</Checkbox>
//                                                             <Checkbox value="delete">Delete</Checkbox>
//                                                         </Checkbox.Group>
//                                                     </Form.Item>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))} */}
//                                 {STAFF_DATA.map((item, index) => (
//                                     <tr key={index}>
//                                         <td className="border-2">{index + 1}</td>
//                                         <td className="border-2">{item.section}</td>
//                                         <td className="border-2">
//                                             <div className="flex justify-center">
//                                                 <Form.Item className="w-full flex flex-col gap-2 p-2 ">
//                                                     <Input.Group compact>
//                                                         <Input
//                                                             name={`${item.section}.read`}
//                                                             placeholder="View"
//                                                             type="checkbox"
//                                                             checked={permissions[item.section]?.includes('view')}
//                                                         />
//                                                         <Input
//                                                             name={`${item.section}.create`}
//                                                             placeholder="Add"
//                                                             type="checkbox"
//                                                             checked={permissions[item.section]?.includes('add')}
//                                                         />
//                                                         <Input
//                                                             name={`${item.section}.write`}
//                                                             placeholder="Edit"
//                                                             type="checkbox"
//                                                             checked={permissions[item.section]?.includes('edit')}
//                                                         />
//                                                         <Input
//                                                             name={`${item.section}.delete`}
//                                                             placeholder="Delete"
//                                                             type="checkbox"
//                                                             checked={permissions[item.section]?.includes('delete')}
//                                                         />
//                                                     </Input.Group>
//                                                 </Form.Item>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <Form.Item></Form.Item>
//                     </Form>
//                 </Modal>
//                 <Modal
//                     title="Confirm Deletion"
//                     open={deleteModalVisible}
//                     onCancel={() => setDeleteModalVisible(false)}
//                     footer={
//                         <div className="flex gap-3 justify-end">
//                             <Button onClick={() => setDeleteModalVisible(false)}>{CANCEL}</Button>
//                             <Button type="primary" htmlType="submit" onClick={delete_role_api}>
//                                 {OK}
//                             </Button>
//                         </div>
//                     }
//                 >
//                     <p>{DELETE_CONFIRMATION}</p>
//                 </Modal>
//             </div>
//         </div>
//     );
// }
// const renderPermissionsCheckboxes = (permissions: any[]) => {
//     const permissionCheckboxes = ['read', 'write', 'create', 'delete'];

//     return permissions.map((permission) => (
//         <div key={permission.section}>
//             <div className="w-full flex flex-row border border-black gap-3">
//                 <div className="w-auto ">
//                     <h1 className="font-semibold">{permission.section}</h1>
//                 </div>
//                 <div className="w-auto ">
//                     {permissionCheckboxes.map((action) => (
//                         <Checkbox
//                             key={`${permission.section}-${action}`}
//                             defaultChecked={permission.permission.includes(action)}
//                         >
//                             {action}
//                         </Checkbox>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     ));
// };

// import React from 'react'

function Role_data() {
    const [roledata, setroledata] = useState<role_data[]>([]);
    const [editmodal, setEditmodal] = useState(false);
    const [editmodelId, setEditmodalID] = useState('');
    const [deleteid, setdeletedid] = useState('');
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    // const [CurrentEditValue, setCurrentEditValue] = useState([]);
    const [form] = useForm();
    // const dummy_data = [
    //     {
    //         Permissions: [
    //             {
    //                 section: 'dashboard',
    //                 permission: ['read', 'create', 'write', 'delete'],
    //             },
    //             {
    //                 section: 'order',
    //                 permission: ['read', 'create'],
    //             },
    //         ],
    //     },
    // ];
    // console.log('====================================');
    // console.log(form.getFieldsValue());
    // console.log('====================================');
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
                            onClick={() => handleEdit(record, record.id)}
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

    const fetchData = useCallback(async () => {
        // setloading(true);
        try {
            const response = await http.get('/api/v1/admin/role');
            setroledata(response.data.data);
            // console.log(response.data.data);
            // setloading(false);
        } catch (error) {
            message_error(error as Error);
        } finally {
            // setloading(false);
        }
    }, []);
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
    const handleEdit = (record: role_data, id: string) => {
        setEditmodal(true);
        form.setFieldsValue(record);
        handleDisplayEditdata(id);
        setEditmodalID(id);
    };
    const handleDisplayEditdata = async (id: string) => {
        // console.log(setCurrentEditValue);
        // setEditmodal(false);
        console.log(id);
        try {
            const updateRecord = await http.get(`/api/v1/admin/role/${id}`);
            form.setFieldsValue({
                role_name: updateRecord.data.data.name,
                description: updateRecord.data.data.description,
                permissions: updateRecord.data.data.permissions,
            });
            console.log(form.getFieldsValue());
            console.log(updateRecord.data.data);
            // setCurrentEditValue(updateRecord.data.data.permission);

            fetchData();
        } catch (error) {
            message_error(error as Error);
        }
    };

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

    const handleSubmit = async () => {
        console.log(editmodelId);
        try {
            const formData = form.getFieldsValue();
            const response = await http.patch(`/api/v1/admin/role/${editmodelId}`, formData);
            console.log(response.data.data);
        } catch (error) {
            message_error(error as Error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div>
                <div>
                    <Card title="Cities" className="m-2">
                        //{' '}
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
                </div>
                <div>
                    <Modal title="Edit Role" open={editmodal} onOk={() => form.submit()} width={1000}>
                        <Form form={form} onFinish={handleSubmit} name="basic" className="w-full flex flex-col">
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
                            <Form.List name="permissions">
                                {(fields) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <>
                                                <div className="w-full p-2 m-2" key={field.key}>
                                                    {/* <div key={field.key} className='grid grid-cols-2 gap-3 p-2 m-2 justify-items-center'> */}
                                                    {/* {console.log(field)} */}
                                                    <div className="w-full flex flex-row  gap-3">
                                                        <div className="w-auto ">
                                                            <Form.Item {...field} name={[field.name, 'section']}>
                                                                {<Input readOnly />}
                                                            </Form.Item>
                                                        </div>
                                                        <div className="w-auto ">
                                                            <Form.Item
                                                                // className="w-full flex flex-col gap-2"
                                                                // label="permission"
                                                                name={[field.name, 'section_permission']}
                                                            >
                                                                <Checkbox.Group
                                                                    options={[
                                                                        { label: 'read', value: 'read' },
                                                                        { label: 'write', value: 'write' },
                                                                        { label: 'create', value: 'create' },
                                                                        { label: 'delete', value: 'delete' },
                                                                    ]}
                                                                    // defaultValue={['read', 'write', 'create', 'delete']}
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* </div> */}
                                            </>
                                        ))}
                                    </>
                                )}
                            </Form.List>
                            {/* <Form.Item className="w-full flex flex-col gap-2" label="Permissions" name="permission">
                                <Checkbox.Group
                                    options={[
                                        { label: 'read', value: 'read' },
                                        { label: 'write', value: 'write' },
                                        { label: 'create', value: 'create' },
                                        { label: 'delete', value: 'delete' },
                                    ]}
                                    // defaultValue={['read', 'write', 'create', 'delete']}
                                /> */}
                            {/* {['read', 'write', 'create', 'delete'].map((action, index) => (
                                    <Checkbox key={`${index}`}>{action}</Checkbox>
                                ))} */}
                            {/* <div className="w-full grid grid-cols-2 gap-3 p-2 m-2 justify-items-center border border-purple-500">
                                    {renderPermissionsCheckboxes(CurrentEditValue)}
                                </div> */}
                            {/* </Form.Item> */}
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
        </>
    );
}

export default Role_data;
