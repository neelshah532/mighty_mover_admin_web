import axios from 'axios';
// import { error } from 'console';
const config = {
    baseURL: 'http://192.168.68.50:3000',
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
export const blog_admin = async () => {
    return axios.get('/api/v1/blog/post?limit=10&offset=0', config);
};
export const blog_admin_get_one = async (id:any) => {
    return axios.get(`/api/v1/blog/post/${id}`, config);
};
