import axios from 'axios';
import { FormValues } from '../assets/dto/data.type';
// import { error } from 'console';
const config = {
    baseURL: 'http://192.168.68.53:3000',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJVc2VybmFtZSI6IktldGFuIiwiUGFzc3dvcmQiOiJLZXRhbkAxMjIzIn0.2ypcOji0gmoYcFfGaa16cD5SNtYW8is8bx779KcMOM8',
    },
};

export const adminAuthLogin = async (payload: any) => {
    return axios.post('/api/v1/admin/login', payload, config);
};
export const blog_admin = async (page:number) => {
    const skip = (page - 1) * 10;

    return axios.get(`/api/v1/blog/post?limit=10&offset=${skip}`, config);
};
export const blog_admin_get_one = async (id: string) => {
export const blog_admin_get_one = async (id: string) => {
    return axios.get(`/api/v1/blog/post/${id}`, config);
};
export const createAdmin = async (payload: FormValues) => {
    return axios.post('/api/v1/admin/register', payload, config);
};

