import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { SETTINGS_STRING } from '../assets/constant/constant';
import { IoMdSettings } from "react-icons/io";
import { Select } from 'antd';

interface FieldType {
    label?: string,
    name?: string,
    message?: string,
    placeholder?: string
}

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Settings: React.FC = () => (
    <>
        <div className='bg-white rounded-md mx-2'>
            <div className=''>
                <h1 className='text-xl font-bold p-4'>Edit Setting</h1>
            </div>
            <div className='flex gap-0.5 pl-4 pb-1 border-b border-black'>
                < IoMdSettings className='size-7 animate-spin' /><h2 className='font-semibold text-lg'>General Information</h2>
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

                    <div className='grid grid-cols-3 w-full gap-2 p-2'>
                        {SETTINGS_STRING.section1.map((item) => (
                            <Form.Item<FieldType>
                                label={item.label}
                                name={item.name}
                                rules={[{ required: item.req, message: item.message }]}
                            >
                                <Input placeholder={item.placeholder} />
                            </Form.Item>
                        ))}
                        <Form.Item
                            label="Select Movers Use Vehicle Type"
                            name="select_1"
                            rules={[{ required: false, message: "Please Select Vehicle Type" }]}
                        >
                            <Select defaultValue="Select Vehicle Type"
                                options={[
                                    { value: 'Truck', label: 'Truck' },
                                    { value: '2 wheeler', label: '2 Wheeler' },
                                    { value: '4 wheeler', label: '4 Wheeler' }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Select Courier Use Vehicle Type"
                            name="select_2"
                            rules={[{ required: false, message: "Please Select Vehicle Type" }]}
                        >
                            <Select defaultValue="Select Vehicle Type"
                                options={[
                                    { value: 'Truck', label: 'Truck' },
                                    { value: '2 wheeler', label: '2 Wheeler' },
                                    { value: '4 wheeler', label: '4 Wheeler' }
                                ]}
                            />
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

export default Settings;