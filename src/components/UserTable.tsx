import React, { useState } from 'react';
import { Empty, Card, Table, Button, Modal } from 'antd';
import { USER_DATA_COL, USER_TABLE } from '../assets/constant/constant';
import { User } from '../assets/dto/data.type';
import { ColumnProps } from 'antd/es/table';
import { Form, type FormProps, Input } from 'antd';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useForm } from 'antd/es/form/Form';
type FieldType = {
    name?: string;
    email?: string;
    number?: number
};
const { Column } = Table;

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};




const UserPage: React.FC = () => {
    const [modal2Open, setModal2Open] = useState(false);
    const [form] = useForm()
    const data: User[] = USER_TABLE;
    const columns: ColumnProps<User>[] = [
        ...USER_DATA_COL,
        {
            title: 'Action',
            key: 'action',
            render: (_, record: User) => (
                <div className='flex gap-2'>
                    <div>
                        <button onClick={() =>
                            handleEdit(record)
                        }>
                            <FaEdit />
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handleDelete(record.index)}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ),
        },
    ];



    const handleEdit = (record: User[]) => {
        setModal2Open(true)
        form.setFieldsValue(record)
    };

    const handleDelete = (index: number) => {
        console.log(index);
        USER_TABLE.splice(index - 1, 1)
        console.log(USER_TABLE)
    };

    return (
        <div>
            <div>
                {columns.length === 0 ? (
                    <Empty />
                ) : (
                    <>
                        <Card title="User Settings" className="m-2 random:w-1/2">
                            <Table
                                dataSource={data}
                                pagination={{ pageSize: 4 }}
                                columns={columns}
                                bordered
                                sticky
                                className="w-full"
                            />
                        </Card>
                    </>
                )}
            </div>
            <Modal
                title="Edit User"
                centered
                open={modal2Open} 
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                footer={null}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 3 }}

                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className='w-full'
                >
                    <Form.Item<FieldType>
                        label="Name"
                        name="name"
                        rules={[{ required: false, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: false, message: 'Please input your password!' }]}

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Number"
                        name="number"
                        rules={[{ required: false, message: 'Please input your number!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className='flex gap-3 justify-end'>
                        <Button onClick={() => setModal2Open(false)}>Cancel</Button>
                        <Button onClick={()=>setModal2Open(false)}>OK</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default UserPage;
