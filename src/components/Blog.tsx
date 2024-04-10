import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { BLOG_SETTINGS_STRING } from '../assets/constant/constant';
import { IoMdSettings } from "react-icons/io";
import { UploadOutlined } from '@ant-design/icons';

import { message, Upload } from 'antd';



interface FieldType {
    label?: string,
    name?: string,
    message?: string,
    placeholder?: string
}

const { TextArea } = Input;

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
};


const Blog: React.FC = () => (
    <>
        <div className='bg-white rounded-md mx-2'>
            {/* <div className=''>
                <h1 className='text-xl font-bold p-4'>Edit Blog Settings</h1>
            </div> */}
            <div className='border-b border-black'>
                <div className='flex ml-2 gap-2 items-center'>  
                    < IoMdSettings className='size-7 mt-2' /><h2 className='font-semibold text-lg mt-2'>Blog Settings</h2>
                </div>
            </div>
            <div>
                <Form
                    className=''
                    name="basic"
                    // labelCol={{ span: 16 }}
                    // wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >

                    <div className='flex flex-col items-center gap-2 p-4'>
                        {BLOG_SETTINGS_STRING.settings.map((item) => (
                            <Form.Item<FieldType>
                                label={item.label}
                                name={item.name}
                                rules={[{ required: item.req, message: item.message }]}
                                className='w-1/2'
                            >
                                <Input placeholder={item.placeholder} />
                            </Form.Item>
                        ))}
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: "Please Upload Image!" }]}
                            className='w-1/2'
                        >
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                listType="picture"
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>


                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: "Please Enter Description!" }]}
                            className='w-1/2'
                            style={{ fontSize: "100px" }}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item className='w-1/2'>
                            <Button type="primary" htmlType="submit" className='bg-blue-500 w-full'>
                                Submit
                            </Button>
                        </Form.Item>

                    </div>

                </Form>
            </div>
        </div>
    </>
);

export default Blog;