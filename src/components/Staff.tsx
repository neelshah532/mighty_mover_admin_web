import { Button, Card } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/pageSlice';
import http from '../http/http';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { staff_data_col } from '../assets/constant/staff';
import { AlignType} from '../assets/dto/data.type';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Staff() {
    const Admin_data_col=[
        ...staff_data_col,
        {
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: (_, record: any) => (
                <div className="flex gap-2 justify-center">
                    <div>
                        <button
                            className="py-3 px-4 bg-blue-500 text-white rounded"
                        >
                            <FaEdit />
                        </button>
                    </div>
                    <div>
                        <button
                            className="py-3 px-4 bg-red-500 text-white rounded"
                        >
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ),
        },
    ]
    const fetchData = async () => {
        try {
            const response = await http.get('/api/v1/admin?limit=10');
            console.log(response.data.data);
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
                console.log('Response Error', axiosError.response);
                toast.error(axiosError.response.data.message);
            } else if (axiosError.request) {
                console.log('Request Error', axiosError.request);
            } else {
                console.log('Error', axiosError.message);
            }
        }
    };
  
    const dispatch = useDispatch();

    useEffect(() => {
        fetchData();
        dispatch(setPage('Staff Management'));
    }, [dispatch]);
    return (
        <div>
            <Card title="Staff Management" className="m-2">
                <div className="flex justify-end mb-2 gap-[10px]">
                    <div>
                        <Button style={{ backgroundColor: '#ffffff', color: '#2967ff' }}>
                            + Create New Admin User
                        </Button>
                    </div>
                    <div >
                        <Link to="/staff/role-management">
                        <Button style={{ backgroundColor: '#ffffff', color: '#2967ff' }}>+ Create New Role</Button>
                        </Link> 
                    </div>
                </div>

                <>
                    {/* <Table
                            rowClassName="text-center"
                            dataSource={citydata}
                            pagination={{ pageSize: 10, total: total }}
                            columns={Admin_data_col}
                            
                            bordered
                            sticky
                            className="w-full"
                        ></Table> */}
                </>
            </Card>
        </div>
    );
}
