import { Button, Card, Flex, Spin, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
// import { ADD_ITEM, CANCEL, DELETE, DELETE_CONFIRMATION, EDIT_ITEM } from '../assets/constant/model';
import { ADMIN_COL } from '../assets/constant/adminDisplay';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import http from '../http/http';
import { useDispatch } from 'react-redux';
import { AdminsDisplay } from '../assets/dto/data.type';
import { setPage } from '../redux/pageSlice';
import { TiPlusOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

function VIewAdmin() {
    const [loading, setLoading] = useState(false);
    const [adminData, setAdminData] = useState<AdminsDisplay[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createAdmin = () => {
        navigate('/staff-management/add');
    }
    const createRole = () => {
        navigate('/staff-management/role-management');
    };
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await http.get(`/api/v1/admin`);
            //  console.log(currentPage);
            // console.log(response.data.data);
            setAdminData(response.data.data);
            // console.log(total);

            setLoading(false);
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
            }
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        dispatch(setPage('Admin'));
        void fetchData();
    }, [dispatch, fetchData]);

    return (
        <>
            <div className='container'>
               
                <>
                    <div className="flex justify-end mb-2">
                        <div>
                            <Button icon={<TiPlusOutline />} className="mr-4" onClick={createAdmin}>
                                Create New Admin User
                            </Button>
                            <Button icon={<TiPlusOutline /> } onClick={createRole}>Create New Role</Button>
                        </div>
                    </div>
                    {loading ? (
                        <Flex gap="middle" className="w-full h-full justify-center ">
                            <Spin size="large" />
                        </Flex>
                    ) : (
                        <>
                            <Card title="Staff Management" className="m-2">
                                <Table
                                    rowClassName="text-center"
                                    dataSource={adminData}
                                    // pagination={{
                                    //     pageSize: 5,
                                    //     total: total,
                                    //     current: currentPage,
                                    //     onChange: (page) =>{
                                    //         setCurrentPage(page)
                                    //         fetchData();
                                    //     },
                                    // }}
                                    pagination={false}
                                    columns={ADMIN_COL()}
                                    // bordered
                                    sticky
                                    className="w-full"
                                ></Table>
                                {/* <Pagination
                                   current={currentPage}
                                   onChange={(page) => HandlePagination(page)}
                                   total={total}
                                   pageSize={10}
                               /> */}
                               
                            </Card>
                            
                        </>
                    )}
                </>

               
            </div>
        </>
    );
}

export default VIewAdmin;
