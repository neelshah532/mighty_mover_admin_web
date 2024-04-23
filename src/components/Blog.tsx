import { Button, Form, type FormProps, Input } from 'antd';
import { BLOG_SETTINGS_STRING } from '../assets/constant/constant';
import { IoMdSettings } from 'react-icons/io';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import formhttp from '../http/Form_data';
import http from '../http/http';
import { useState } from 'react';
import { FileInfo } from '../assets/dto/data.type';
interface valueinterface {
    title: string;
    description: string;
    author_name: string;
    documentId: string;
}
interface FieldType {
    label?: string;
    name?: string;
    message?: string;
    placeholder?: string;
}

export default function Blog() {
    const [data] = useForm<valueinterface>();
    const [imgid, setimgid] = useState<string>('');
    // const [value, setValue] = useState<valueinterface>({title:"",description:"",author_name:"",documentId:""});

    // console.log(value)

    const onFinish: FormProps<valueinterface>['onFinish'] = async (values: valueinterface) => {
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            ['link', 'formula'],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ['clean'], // remove formatting button
        ];
        const quill = new Quill('#quill', {
            modules: {
                toolbar: toolbarOptions,
            },
            theme: 'snow',
        });

        console.log(values);
        try {
            const response = await http.post('/api/v1/blog', {
                title: values.title,
                description: JSON.stringify(quill.getContents()),
                author_name: values.author_name,
                document_id: imgid,
            });
            toast.success(response.data.message);
        } catch (error) {
            message_error(error as Error);
        }
        data.resetFields();
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        const { values, errorFields, outOfDate } = errorInfo;
        console.log('Failed:', values, errorFields, outOfDate);
    };

    const handlechange = async (info: FileInfo) => {
        const { file } = info;
        const formData = new FormData();
        formData.append('type', 'blog');
        formData.append('image', file);
        try {
            const response = await formhttp.post('/api/v1/document', formData);
            setimgid(response.data.data.document_id);
        } catch (error) {
            message_error(error as Error);
        }
    };

    const message_error = (error: Error) => {
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
            <div className="bg-white rounded-md mx-2 w-full">
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
                        className="w-full"
                        name="basic"
                        // labelCol={{ span: 16 }}
                        // wrapperCol={{ span: 16 }}
                        onFinish={onFinish}
                        onFinishFailed={() => void onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <div className="flex flex-col items-center justify-center w-full gap-2 p-4">
                            {BLOG_SETTINGS_STRING.settings.map((item) => (
                                <Form.Item<FieldType>
                                    label={item.label}
                                    name={
                                        item.name as
                                            | 'name'
                                            | 'label'
                                            | 'message'
                                            | 'placeholder'
                                            | ['name']
                                            | ['label']
                                            | ['message']
                                            | ['placeholder']
                                    }
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
                                    customRequest={() => void handlechange}
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
                                <ReactQuill
                                    theme="snow"
                                    className="h-[300px] "
                                    id="quill"
                                    //   modules={{
                                    //     toolbar: [
                                    //         [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                    //         [{ 'size': [] }],
                                    //         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    //         [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                    //         { 'indent': '-1' }, { 'indent': '+1' }],
                                    //         ['link', 'image', 'video'],
                                    //         ['clean']
                                    //     ]
                                    // }}
                                    // formats={[
                                    //     'header', 'font', 'size',
                                    //     'bold', 'italic', 'underline', 'strike', 'blockquote',
                                    //     'list', 'bullet', 'indent',
                                    //     'link', 'image', 'video'
                                    // ]}
                                />
                            </Form.Item>

                            <Form.Item className="w-1/2 mt-6">
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
