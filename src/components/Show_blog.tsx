import { Button, Card, Flex, Form, FormProps, Image, Input, Modal, Spin, Table, Upload } from 'antd';
import { BLOG_DATA } from '../assets/constant/blog_constant';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { AlignType, blog } from '../assets/dto/data.type';
import { useEffect, useState } from 'react';
import http from '../http/http';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';

import { blog_admin, blog_admin_get_one } from '../http/staticTokenService';
import { CANCEL, DELETE_CONFIRMATION, OK } from '../assets/constant/model';

import { BLOG_SETTINGS_STRING } from '../assets/constant/constant';
import { FieldNamesType } from 'antd/es/cascader';
import ReactQuill, { Quill } from 'react-quill';
import { useForm } from 'antd/es/form/Form';
import formhttp from '../http/Form_data';
import { UploadOutlined } from '@ant-design/icons';

export default function Show_blog() {
    const [loading, setloading] = useState(false);
    const [AllBlogData, setAllBlogData] = useState([]);
    const [deletemodal, setdeletemodal] = useState(false);
    const [deleteid, setdeleteid] = useState('');
    const [openeditmodal, seteditmodal] = useState(false);
    const [editid,seteditid]=useState("")
    const [editdata, seteditdata] = useState({});
    const [data] = useForm();
    const [value, setValue] = useState<valueinterface>({ title: '', description: '', author_name: '', documentId: '' });
    const [imgid, setimgid] = useState('');
    const [imgurl, setimgurl] = useState('');
    interface valueinterface {
        title: string;
        description: string;
        author_name: string;
        documentId: string;
    }

    const onFinish: FormProps<valueinterface>['onFinish'] = async (values) => {
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
            const response = await http.patch(`/api/v1/blog/post/${editid}`, {
                title: values.title,
                description: JSON.stringify(quill.getContents()),
                author_name: values.author_name,
                documentId: imgid,
            });
            toast.success(response.data.message);
            fetchData()
        } catch (error) {
            message_error(error);
        }
        data.resetFields();
    };

    const handlechange = async (info: any) => {
        const { file } = info;
        const formData = new FormData();
        const fileData: any = file;
        console.log(fileData);
        formData.append('type', 'blog');
        formData.append('image', fileData);
        try {
            const response = await formhttp.post('/api/v1/document', formData);
            setimgid(response.data.data.document_id);
            setimgurl(response.data.data.document)
        } catch (error) {
            message_error(error);
        }
    };
    const fetchData = async () => {
        setloading(true);
        try {
            const response = await blog_admin();

            setAllBlogData(response.data.data);
            setloading(false);
        } catch (error) {
            message_error(error);
        } finally {
            setloading(false);
        }
    };

    const edit_modal_open_function = async (id: any) => {
        seteditid(id)
        seteditmodal(!openeditmodal);
        try {
            const response = await blog_admin_get_one(id);
            console.log(response.data.data);
            setimgurl(response.data.data.document);
            data.setFieldsValue({
                title: response.data.data.title,
                author_name: response.data.data.author_name,
                description: response.data.data.description,
            });
            data.setFieldValue("description", response.data.data.description.ops.insert.split("").splice(0,10).join())
          
            
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

    useEffect(() => {
        fetchData();
    }, []);

    const handledelete = async () => {
        try {
            const response = await http.delete(`/api/v1/blog/post/${deleteid}`);
            toast.success(response.data.message);
            setdeleteid('');
            fetchData();
        } catch (error) {
            message_error(error);
        }
    };
    const handlemodaldelete = (id: string) => {
        setdeleteid(id);
        setdeletemodal(!deletemodal);
    };


    const blogdata = [
        ...BLOG_DATA,
        {
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: (_, record: blog) => (
                <div className="flex gap-2 justify-center">
                    <div>
                        <button onClick={() => edit_modal_open_function(record.id)}>
                            <FaEdit />
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handlemodaldelete(record.id)}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div>
            <Card title="Blogs" className="m-2">
                {loading ? (
                    <Flex gap="middle" className="w-full h-full justify-center ">
                        <Spin size="large" />
                    </Flex>
                ) : (
                    <>
                        <Table
                            rowClassName="text-center"
                            dataSource={AllBlogData}
                            pagination={{ pageSize: 10 }}
                            columns={blogdata}
                            bordered
                            sticky
                            className="w-full"
                        ></Table>
                    </>
                )}
            </Card>
            <Modal
                title="Confirm Deletion"
                open={deletemodal}
                onCancel={() => setdeletemodal(false)}
                footer={
                    <div className="flex gap-3 justify-end">
                        <Button onClick={() => setdeletemodal(false)}>{CANCEL}</Button>
                        <Button type="primary" htmlType="submit" onClick={handledelete}>
                            {OK}
                        </Button>
                    </div>
                }
            >
                <p>{DELETE_CONFIRMATION}</p>
            </Modal>
            <Modal title="Edit Blog" width={900} open={openeditmodal} footer={false} onCancel={()=>seteditmodal(false )}>
                <div className="flex justify-center items-center mt-2">
                    <Form
                        form={data}
                        className="w-full"
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <div className="flex flex-col items-center justify-center w-full border-2 gap-2 p-4 ">
                            {BLOG_SETTINGS_STRING.settings.map((item, index) => (
                                <Form.Item<FieldNamesType>
                                    key={index}
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
                                <div className="w-full flex-col gap-4 items-center">
                                    <div>
                                        <Image width={150} src={imgurl} />
                                    </div>
                                    <div>
                                        <Upload
                                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                            listType="picture"
                                            customRequest={handlechange}
                                        >
                                            <Button icon={<UploadOutlined />}>Upload New Banner</Button>
                                        </Upload>
                                    </div>
                                </div>
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
                                />
                            </Form.Item>
                            <Form.Item className="w-1/2 mt-6">
                                <Button type="primary" htmlType="submit" className="bg-blue-500 w-full" >
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    );
}
