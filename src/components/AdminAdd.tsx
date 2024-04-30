// import React from 'react'

import React, { useCallback, useEffect } from 'react';
import { Input, Select, Button, Form } from 'antd';
// import http from '../http/http';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { createAdmin } from '../http/staticTokenService';
import { useNavigate } from 'react-router-dom';
import { FormValues } from '../assets/dto/data.type';
import { BACK_BUTTON } from '../assets/constant/model';

const { Option } = Select;

const AdminAdd: React.FC = () => {
    const [form] = Form.useForm<FormValues>();
    const navigate = useNavigate();
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
    const CreateAdmin = useCallback(async () => {
        // form.validateFields().then((values) => {
        //     console.log('Received values of form: ', values);
        // });

        try {
            // const response = await http.post('/api/v1/admin', form.getFieldsValue({}));
            const values = form.getFieldsValue();
            const response = await createAdmin({
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                role_name: values.role_name,
                password: values.password,
            });
            console.log(response);
            toast.success(response.data.message);
            form.resetFields();
            navigate('/staff-management');
        } catch (error) {
            handleError(error as Error);
        }
    }, [form]);

    const BackTOMainPage = () => {
        navigate('/staff-management');
        form.resetFields();
    };
    const handleBack = () => {
        navigate('/staff-management');
    };
    useEffect(() => {
        void CreateAdmin;
    }, [CreateAdmin]);

    return (
        <>
            <div className="container">
                <>
                    <div className="p-4 flex flex-col justify-center items-center">
                        <div className=" mb-8 gap-5  w-[80%]">
                            <div className="flex justify-start items-start w-full">
                                <h2 className="text-xl font-bold w-full ml-4">Create New Admin User</h2>
                            </div>
                            <div className="flex justify-end w-auto  mb-2">
                                <div className="  w-56">
                                    <Button onClick={handleBack} style={{ width: '100px' }}>
                                        {BACK_BUTTON}
                                    </Button>
                                </div>
                            </div>
                            <div className="">
                                <Form
                                    form={form}
                                    layout="vertical"
                                    initialValues={{
                                        role: 'admin',
                                    }}
                                >
                                    {/* <Card>
                            </Card> */}
                                    <div className="flex justify-center">
                                        <div className="flex flex-col justify-center items-center w-[80%] border-2 border-black-200  p-6 rounded-2xl">
                                            <div className="w-full">
                                                <div className="grid grid-cols-2 gap-4 ">
                                                    <Form.Item
                                                        name="first_name"
                                                        label="First Name"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your first name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder="Enter First Name" className="p-2" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="last_name"
                                                        label="Last Name"
                                                        rules={[
                                                            { required: true, message: 'Please input your last name!' },
                                                        ]}
                                                    >
                                                        <Input placeholder="Enter Last Name" className="p-2" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="email"
                                                        label="Email Id"
                                                        rules={[
                                                            { required: true, message: 'Please input your email!' },
                                                            {
                                                                type: 'email',
                                                                message: 'Please enter a valid email address!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder="Enter Email Id" className="p-2" />
                                                    </Form.Item>

                                                    <Form.Item
                                                        name="role_name"
                                                        label="Select Role"
                                                        rules={[{ required: true, message: 'Please select a role!' }]}
                                                    >
                                                        <Select placeholder="Select Role">
                                                            <Option value="admin">Admin</Option>
                                                            <Option value="user">User</Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="password"
                                                        label="Create New Password"
                                                        rules={[
                                                            { required: true, message: 'Please input your password!' },
                                                            {
                                                                min: 8,
                                                                message: 'Password must be at least 8 characters long!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input.Password
                                                            placeholder="Enter New Password"
                                                            className="p-2"
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name="confirmPassword"
                                                        label="Confirm New Password"
                                                        dependencies={['password']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please confirm your password!',
                                                            },
                                                            ({ getFieldValue }) => ({
                                                                validator(_, value) {
                                                                    if (!value || getFieldValue('password') === value) {
                                                                        return Promise.resolve();
                                                                    }
                                                                    return Promise.reject(
                                                                        new Error(
                                                                            'The two passwords that you entered do not match!'
                                                                        )
                                                                    );
                                                                },
                                                            }),
                                                        ]}
                                                    >
                                                        <Input.Password
                                                            placeholder="Enter Confirm New Password"
                                                            className="p-2"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <div className="flex justify-end mt-4">
                                                    <Button className="mr-4" onClick={() => BackTOMainPage()}>
                                                        Cancel
                                                    </Button>
                                                    <Button htmlType="submit" onClick={CreateAdmin}>
                                                        Create
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
};
export default AdminAdd;
