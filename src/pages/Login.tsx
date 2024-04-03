import React, { useState, useEffect } from 'react';
import { Button, Input, Form, message } from 'antd'; // Import message from antd
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { userData } from '../assets/userData';
import { LOGIN_DATA_STRING } from '../assets/constant/constant';
interface User {
    email: string;
    password: string;
    role: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            navigate('/dashboard');
            // message.error('you dont have permission');
        }
    }, [navigate]);

    const onFinish = (values: User) => {
        const user = userData.find((u) => u.email === values.email && u.password === values.password);
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            if (user.role === 'admin') {
                navigate('/dashboard');
            } else {
                navigate('/login');
            }
            message.success('Login successfully');
        } else {
            message.error('Invalid email or password');
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg dark:border dark:border-gray-700">
                <div className="bg-blue-500 py-4 px-4 rounded-t-lg text-white">
                    <h1 className="text-xl text-white font-bold text-center">{LOGIN_DATA_STRING.TITLE}</h1>
                </div>
                <div className="mt-6">
                    <Form name="login-form" onFinish={onFinish} className="space-y-4">
                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input
                                prefix={<UserOutlined />}
                                placeholder={LOGIN_DATA_STRING.EMAIL}
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder={LOGIN_DATA_STRING.PASSWORD}
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="btn-signin"
                                block
                                style={{ backgroundColor: '#1890ff' }}
                            >
                                {LOGIN_DATA_STRING.LOGIN}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default Login;
