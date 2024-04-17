import React, { useState } from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { BLOG_SETTINGS_STRING } from '../assets/constant/constant';
import { IoMdSettings } from 'react-icons/io';
import { UploadOutlined } from '@ant-design/icons';

import { Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import http from '../http/Form_data';

export default function Blog() {
    const [data] = useForm();
    interface FieldType {
        label?: string;
        name?: string;
        message?: string;
        placeholder?: string;
    }

    const { TextArea } = Input;

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        data.resetFields();
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handlechange = async (info: any) => {
        const { file } = info;
        const formData = new FormData();
        const fileData: any = file;
        console.log(fileData);
        formData.append('folder', 'licence');
        formData.append('image', fileData);
        try {
            const response = await http.post('/api/v1/document', formData);
            console.log(response.data);
        } catch (error) {
            message_error(error);
        }
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

    return (
        <>
            <div className="bg-white rounded-md mx-2">
                {/* <div className=''>
                    <h1 className='text-xl font-bold p-4'>Edit Blog Settings</h1>
                </div> */}
                <div className="border-b border-black">
                    <div className="flex ml-2 gap-2 items-center">
                        <IoMdSettings className="size-7 mt-2" />
                        <h2 className="font-semibold text-lg mt-2">Blog Settings</h2>
                    </div>
                </div>
                <div>
                    <Form
                        form={data}
                        className=""
                        name="basic"
                        // labelCol={{ span: 16 }}
                        // wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <div className="flex flex-col items-center gap-2 p-4">
                            {BLOG_SETTINGS_STRING.settings.map((item) => (
                                <Form.Item<FieldType>
                                    label={item.label}
                                    name={item.name}
                                    rules={[{ required: item.req, message: item.message }]}
                                    className="w-1/2"
                                >
                                    <Input placeholder={item.placeholder} />
                                </Form.Item>
                            ))}
                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[{ required: true, message: 'Please Upload Image!' }]}
                                className="w-1/2"
                            >
                                <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture"
                                    customRequest={handlechange}
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please Enter Description!' }]}
                                className="w-1/2"
                                style={{ fontSize: '100px' }}
                            >
                                <TextArea rows={4} />
                            </Form.Item>

                            <Form.Item className="w-1/2">
                                <Button type="primary" htmlType="submit" className="bg-blue-500 w-full">
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}
