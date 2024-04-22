import { Button, Card, Form, Input, Table } from 'antd';
import { AlignType } from '../assets/dto/data.type';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export default function Role_management() {
    const STAFF_DATA = [
        {  section: 'Dashboard' },
        {  section: 'Order' },
        {  section: 'Payment' },
        {  section: 'Delivery Partner' },
        {  section: 'Categories' },
        {  section: 'City' },
        {  section: 'Coupon' },
        {  section: 'Blog' },
        {  section: 'Vehicle' },
        {  section: 'Staff Management' },
        {  section: 'Order Settings' },
        {  section: 'Blog Settings' },
        {  section: 'User Settings' },



    ];

    const STAFF_DATA_COL = [
        {
            title: 'Index',
            dataIndex: 'id',
            render: (_, __, index) => index + 1,
            align: 'center' as AlignType,
            width:"70px"
        },
        {
            title: 'Section',
            dataIndex: 'section',
            align: 'center' as AlignType,
            width:"100px"
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            width: '200px',
            render: (_, record: any) => (
                <div className="flex justify-center ">
                    <div className="flex gap-10 items-center">
                        <div className="flex gap-2 items-center">
                            View<input type="checkbox"></input>
                        </div>
                        <div className="flex gap-2 items-center">
                            Add<input type="checkbox"></input>
                        </div>
                        <div className="flex gap-2 items-center">
                            Edit<input type="checkbox"></input>
                        </div>
                        <div className="flex gap-2 items-center">
                            Delete<input type="checkbox"></input>
                        </div>
                    </div>
                </div>
            ),
        },
    ];
    const onFinish = (values:any) => {
        // Extract selected permissions
        const selectedPermissions = [];
        STAFF_DATA.forEach((item, index) => {
            if (values[`view-${index}`]) {
                selectedPermissions.push({ section: item.section, action: 'View' });
            }
            if (values[`add-${index}`]) {
                selectedPermissions.push({ section: item.section, action: 'Add' });
            }
            if (values[`edit-${index}`]) {
                selectedPermissions.push({ section: item.section, action: 'Edit' });
            }
            if (values[`delete-${index}`]) {
                selectedPermissions.push({ section: item.section, action: 'Delete' });
            }
        });

        // Add selected permissions to the form values
        values.permissions = selectedPermissions;

        // Send form data to backend or perform any other action
        console.log('Form values:', values);
    };

    return (
        <div className="w-full flex justify-center items-center p-4">
            <Card title="Add New Role" className="w-11/12 ">
                <Form className="w-full flex flex-col" onFinish={onFinish}>
                    <Form.Item
                        name="role_name"
                        rules={[{ required: true, message: 'Please input City name!' }]}
                        className="w-[502px] flex flex-col gap-2"
                    >
                        <div className="py-2 font-semibold">Role Name</div>
                        <Input placeholder="Add Role Name" className="py-2 placeholder:text-xs" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: 'Please input City name!' }]}
                        className="w-full flex flex-col gap-2 "
                    >
                        <div className="py-2 font-semibold">Role Description</div>
                        <Input.TextArea
                            className="border-2 border-gray-300 py-2 placeholder:text-xs"
                            placeholder="Add Role Description"
                        />
                    </Form.Item>
                    <Form.Item
                        name="permission"
                        rules={[{ required: true, message: 'Please input City name!' }]}
                        className="w-full flex flex-col gap-2 "
                    >
                        <div className="py-2 font-semibold">Section Permission</div>
                        <Table bordered columns={STAFF_DATA_COL} dataSource={STAFF_DATA}></Table>
                    </Form.Item>
                    <Form.Item >
                      
                        <Button  htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
