    import { Button, Card,  Form, Input } from 'antd';
    // import { useState } from 'react';
// import { toast } from 'sonner';
// import http from '../http/http';
// import axios, { AxiosError } from 'axios';
// import { role_data } from '../assets/dto/data.type';

    export default function RoleManagement() {
        const [form] = Form.useForm();
        // const [permissions, setPermissions] = useState({});

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

        // const onFinish = (values: any) => {
        //     console.log('Received values of form: ', values);
        //     const formattedData: role_data = {
        //         id: '', // Add the missing id property
        //         created_at: '', // Add the missing created_at property
        //         role_name: values.role_name,
        //         description: values.description,
        //         permissions: Object.entries(permissions).map(([section, permission]) => ({
        //             section,
        //             section_permission: permission,
        //         })),
        //     };

        //     console.log('Formatted data:', formattedData);
        //     postData(formattedData);

        //     form.resetFields();
        //     setPermissions({});
        // };
        // const postData=async(formattedData:role_data)=>{
        //     try{

        //         const response = await http.post("/api/v1/admin/role",formattedData)
        //         toast.success(response.data.message)
        //     }
        //     catch(error){
        //         message_error(error as Error)
        //     }
        // }

        // const handlePermissionChange = (section: string, permission: role_data) => {
        //     setPermissions((prevPermissions) => ({
        //         ...prevPermissions,
        //         [section]: permission,
        //     }));
        // };
        // const message_error = (error: Error) => {
        //     if (axios.isAxiosError(error)) {
        //         const axiosError = error as AxiosError<{
        //             status: number;
        //             message: string;
        //         }>;
        //         if (axiosError.response) {
        //             toast.error(axiosError.response.data.message);
        //         } else if (axiosError.request) {
        //             console.log('Request Error', axiosError.request);
        //         } else {
        //             console.log('Error', axiosError.message);
        //         }
        //     }
        // };

        return (
            <div className="w-full flex justify-center items-center p-4">
                <Card title="Add New Role" className="w-11/12 ">
                    <Form form={form}  className="w-full flex flex-col">
                        <Form.Item
                        rules={[{ required: true, message: 'Please add Name' }]}
                        label="Role Name "
                         name="role_name" className="w-[502px] flex flex-col gap-2">
                            <Input placeholder="Add Role Name" className="py-2 placeholder:text-xs" />
                        </Form.Item>
                        <Form.Item
                        rules={[{ required: true, message: 'Please add description' }]}
                        label="Description"

                         name="description" className="w-full flex flex-col gap-2">
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
                                                    <Form.Item className="w-full flex flex-col gap-2 p-2 ">
                                                    {/* <Checkbox.Group
                                                        onChange={(checkedValues) =>
                                                            handlePermissionChange(item.section, checkedValues)
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
                        <Form.Item>
                            <Button style={{"backgroundColor":"#2967ff","color":"white"}} htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
