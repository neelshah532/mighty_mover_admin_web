import React from 'react';
import { Button, Form, type FormProps, Input } from 'antd';
import { SETTINGS_STRING } from '../assets/constant/constant';
import { IoMdSettings } from "react-icons/io";
import { Switch } from 'antd';

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

const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
};


const Settings: React.FC = () => (
    <>
        <div className='bg-white rounded-md mx-2'>
            <div className=''>
                <h1 className='text-xl font-bold p-4'>Edit Setting</h1>
            </div>
            <div className='flex gap-0.5 pl-4 pb-1 border-b border-black'>
                < IoMdSettings className='size-7 animate-spin' /><h2 className='font-semibold text-lg'>Order Settings</h2>
            </div>
            <div className='w-full flex justify-between items-center p-4'>
                <span className='text-lg font-medium'>Email Verification</span> <Switch defaultChecked onChange={onChange} className='bg-gray-300' />
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

                    <div className='w-full flex justify-center'>
                        <div className='flex flex-col w-1/2 gap-2 p-4'>
                            {SETTINGS_STRING.section1.map((item) => (
                                <Form.Item<FieldType>
                                    label={item.label}
                                    name={item.name}
                                    rules={[{ required: item.req, message: item.message }]}
                                >
                                    <Input placeholder={item.placeholder} />
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className='bg-blue-500 w-full'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </div>

                </Form>
            </div>
        </div>
    </>
);

export default Settings;