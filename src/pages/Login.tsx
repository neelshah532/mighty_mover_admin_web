import React, { useState } from 'react';
import { Button, Input, Form } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import { userData } from '../assets/userData';
import { LOGIN_DATA_STRING } from '../assets/constant/constant';
import { toast } from 'sonner';
import { adminAuthLogin } from '../http/staticTokenService';
import { AdminAdd } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Loader from '../components/Loader';
// import { AdminAdd } from '../redux/userSlice';
// interface User {
//     email: string;
//     password: string;
//     role: string;
// }

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const user = useSelector((state) => state);

    // dispatch(AdminAdd({

    const [loading, setLoading] = useState(false);
    const onFinish = async () => {
        setLoading(true);
        try {
            const response = await adminAuthLogin({ email, password });
            console.log(response.data.data);
            toast.success(response.data.message);
            const obj = {
                id: response.data.data.id,
                first_name: response.data.data.first_name,
                last_name: response.data.data.last_name,
                email: response.data.data.email,
                token: response.data.data.jwt,
            };
            // dispatch(AdminAdd({ email: email, password: password, role: response.data.role }));
            dispatch(AdminAdd(obj));
            localStorage.setItem('user', JSON.stringify(obj));
            navigate('/');
        } catch (error) {
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
                // resetForm();
            }
        } finally {
            navigate('/login');
            setLoading(false);
            // resetForm();
        }
    };

    return (
        <>
            {loading ? (
                <div className="flex w-full h-lvh justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <>
                    <section className=" min-h-screen flex items-center justify-center">
                        <div className="w-full max-w-md p-8  rounded-lg shadow-xl ">
                            <div className="flex justify-center mb-5">
                                <img src="src/assets/Images/Group 1.svg" alt="logo" width={150} height={150} />
                            </div>
                            <div className="bg-[#2967ff] py-4 px-4 rounded-t-lg text-white">
                                <h1 className="text-xl text-white font-bold text-center">{LOGIN_DATA_STRING.TITLE}</h1>
                            </div>
                            <div className="mt-6">
                                <Form name="login-form" onFinish={onFinish} className="space-y-4">
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your email!' }]}
                                    >
                                        <Input
                                            prefix={<UserOutlined />}
                                            placeholder={LOGIN_DATA_STRING.EMAIL}
                                            className="input-field"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
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
                                            style={{ backgroundColor: '#2967ff' }}
                                        >
                                            {LOGIN_DATA_STRING.LOGIN}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default Login;
