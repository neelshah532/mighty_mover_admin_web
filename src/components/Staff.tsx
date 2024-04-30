import { Button, Card, Flex, Spin, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
// import { ADD_ITEM, CANCEL, DELETE, DELETE_CONFIRMATION, EDIT_ITEM } from '../assets/constant/model';
import { ADMIN_COL } from '../assets/constant/adminDisplay';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import http from '../http/http';
import { useDispatch, useSelector } from 'react-redux';
import { AdminsDisplay, AlignType, RootState } from '../assets/dto/data.type';
import { setPage } from '../redux/pageSlice';
import { useNavigate } from 'react-router-dom';
import { ColumnProps } from 'antd/es/table';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

function VIewAdmin() {
    const [loading, setLoading] = useState(false);
    const [adminData, setAdminData] = useState<AdminsDisplay[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rolePermission = useSelector((state: RootState) => state.rolePermission.permission);

    console.log(rolePermission);
    const allowedPermission = (section: string, permissionType: string) => {
        return rolePermission?.some((role) => role.section === section && role.permission?.includes(permissionType));
    };
    const hasEditPermission = allowedPermission('staff management', 'write');
  
    const hasDeletePermission = allowedPermission('staff management', 'delete');


    const admin_col: ColumnProps<AdminsDisplay>[] = [
        ...ADMIN_COL(currentPage, 10),
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_, record) => (
                <div className="flex justify-center">
                    <div
                        className={`${record.status === 'active' ? 'text-[#25a55e]  p-3 w-28  rounded-[5px]  bg-[#F2FCF7] border' : 'text-red-500 p-3 w-28  rounded-[5px]  bg-[#FDF4F5]'}  `}
                    >
                        {record.status}
                    </div>
                </div>
            ),
        },
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
            align: 'center',
            render: (_, record) => (
                <div className="flex justify-center">
                    <div className={`text-blue-500  p-3 w-28  rounded-[5px]  border border-blue-500`}>
                        {record.role}
                    </div>
                </div>
            ),
        },
    ];

    if (hasEditPermission || hasDeletePermission) {
        admin_col.push({
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: () => (
                <div className="flex gap-2 justify-center">
                    {hasEditPermission && (
                        <div>
                            <button
                                //    onClick={() => handleEdit(record, record.id)}
                                className="py-3 px-4 bg-blue-500 text-white rounded"
                            >
                                <FaEdit />
                            </button>
                        </div>
                    )}
                    {hasDeletePermission && (
                        <div>
                            <button
                                //    onClick={() => handleDelete(record.id)}
                                className="py-3 px-4 bg-red-500 text-white rounded"
                            >
                                <MdDelete />
                            </button>
                        </div>
                    )}
                </div>
            ),
        });
    }

    const createAdmin = () => {
        navigate('/staff-management/add');
    };
    const createRole = () => {
        navigate('/staff-management/role-management');
    };
    const fetchData = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const response = await http.get(`/api/v1/admin`);
            //  console.log(currentPage);
            // console.log(response.data.data);
            setCurrentPage(page);
            setAdminData(response.data.data);
            setTotal(response.data.total);
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
        dispatch(setPage('Roles Management'));
        void fetchData(currentPage);
    }, [dispatch, fetchData, currentPage]);

    return (
        <>
            <div className="container">
                <>
                    <div className="flex justify-end mb-2">
                        <div className="p-2">
                            <Button className="mr-4 text-[#2967ff] " onClick={createAdmin}>
                                + Create New Admin User
                            </Button>
                            <Button onClick={createRole} className="text-[#2967ff]">
                                + Role Management
                            </Button>
                        </div>
                    </div>

                    <Card  className="m-2">
                        <Table
                            rowClassName="text-center"
                            dataSource={adminData}
                            pagination={{
                                pageSize: 10,
                                total: total,
                                current: currentPage,
                                onChange: (page) => {
                                    fetchData(page);
                                },
                            }}
                            // pagination={false}
                            columns={
                                loading
                                    ? [
                                          {
                                              title: '',
                                              key: 'loading',
                                              render: () => (
                                                  <Flex gap="middle" className="w-full h-full justify-center">
                                                      <Spin size="large" />
                                                  </Flex>
                                              ),
                                          },
                                      ]
                                    : admin_col
                            }
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
            </div>
        </>
    );
}

export default VIewAdmin;
