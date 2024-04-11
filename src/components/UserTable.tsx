


import React, { useState, useEffect } from 'react';
import { Empty, Card, Table, Button, Modal } from 'antd';
import { USER_DATA_COL, USER_TABLE } from '../assets/constant/constant';
import { AlignType, User } from '../assets/dto/data.type';
import { ColumnProps } from 'antd/es/table';
import { Form, type FormProps, Input } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useForm } from 'antd/es/form/Form';
import { CANCEL, OK } from '../assets/constant/model';

type FieldType = {
    name?: string;
    email?: string;
    number?: number;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const UserPage: React.FC = () => {
    const [enable, setEnable] = useState<boolean[]>([]);
    const [modal2Open, setModal2Open] = useState(false);
    const [form] = useForm();
    const data: User[] = USER_TABLE;

    useEffect(() => {
        // Initialize enable array with true values for all indices
        setEnable(Array.from({ length: data.length }, () => true));
    }, [data]);

    const handleEnable = (index: number) => {
        setEnable(prevEnable => {
            const updatedEnable = [...prevEnable];
            updatedEnable[index] = !updatedEnable[index];
            return updatedEnable;
        });
    }

    const handleEdit = (record: User) => {
        setModal2Open(true);
        form.setFieldsValue(record);
    };

    const columns: ColumnProps<User>[] = [
        ...USER_DATA_COL,
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            align: 'center' as AlignType,
            render: (_, record: User, index: number) => (
                <div>
                    <Button
                        onClick={() => handleEnable(index)}
                        className={enable[index] ? 'text-green-500' : 'text-red-500'}
                    >
                        {enable[index] ? 'Enable' : 'Disable'}
                    </Button>
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: (_, record: User, index: number) => (
                <div className="flex gap-2 justify-center">
                    <div>
                        <button onClick={() => handleEdit(record)} disabled={!enable[index]}>
                            <FaEdit />
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handleDelete(index)} disabled={!enable[index]}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ),
        },
    ];

    const handleDelete = (index: number) => {
        console.log(index);
        USER_TABLE.splice(index, 1);
        setEnable(prevEnable => {
            const updatedEnable = [...prevEnable];
            updatedEnable.splice(index, 1);
            return updatedEnable;
        });
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
                                // rowClassName={'text-center'}
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
                    className="w-full "
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
                    <div className="flex gap-3 justify-end">
                        <Button onClick={() => setModal2Open(false)}>{CANCEL}</Button>
                        <Button onClick={() => setModal2Open(false)}>{OK}</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default UserPage;
