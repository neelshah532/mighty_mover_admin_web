import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { BLOG_SETTINGS_STRING } from '../assets/constant/constant';
import { IoMdSettings } from "react-icons/io";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

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
            <div className=''>
                <h1 className='text-xl font-bold p-4'>Edit Blog Settings</h1>
            </div>
            <div className='flex gap-0.5 pl-4 pb-1 border-b border-black'>
                < IoMdSettings className='size-7' /><h2 className='font-semibold text-lg'>Blog Settings</h2>
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
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>


                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: "Please Enter Description!" }]}
                            className='w-1/2'
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </div>
                    <div className='flex justify-center'>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" className='bg-blue-500'>
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