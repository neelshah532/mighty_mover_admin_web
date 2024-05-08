import { Button, Card, Flex, Spin, Table } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { ColumnProps } from 'antd/es/table';
import { AlignType, notification } from '../assets/dto/data.type';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import http from '../http/http';
import { useDispatch } from 'react-redux';
import { setNotificationPage } from '../redux/notificationSlice';
import { NOTIFICATION_DATA_COL } from '../assets/constant/notifications';
import { useNavigate } from 'react-router-dom';


function Notifications() {
    const navigate = useNavigate();


    const handleChange = async (record: notification) => {
        try {
            navigate(`/notifications/${record.id}`);
        } catch (error) {
            console.error('Error fetching individual notification:', error);
        }
    };



    const Redirect = (record: notification) => {
        return record.notification_status === 'scheduled' ? <Button onClick={()=>handleChange(record)}>Edit</Button> : <Button onClick={()=>handleChange(record)}>Details</Button>;
    };
   

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState(0);


    const [loading, setLoading] = useState(false);

    
    const notifications_data_col: ColumnProps<notification>[] = [
        ...NOTIFICATION_DATA_COL(currentPage,10),
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_:notification, record:notification) => (
                <div
                    className={`${record.notification_status === 'published' ? 'text-green-500 bg-green-50' : 'text-orange-500 bg-orange-50'} rounded-lg p-1`}
                >
                    {record.notification_status === 'published' ? 'Published' : 'Scheduled'}
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center' as AlignType,
            render: (_, record: notification) => <Redirect notification_status={record.notification_status} id={record.id} title={record.title} date={record.date} time={record.time} description={record.description}/>,
        },
    ];
    const handleError = (error: Error) => {
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


    const [notificationData, setNotificationData] = useState<notification[]>([]);


    const fetchData = useCallback(async (page:number) => {
        setLoading(true);
        try {
            const skip = (page - 1) * 10;
            const response = await http.get(`/api/v1/notifications?offset=${skip}`);
            setNotificationData(response.data.data);
            setCurrentPage(page)
            setTotal(response.data.total);
            setLoading(false);
        } catch (error) {
            handleError(error as Error);
        } finally {
            setLoading(false);
        }
    }, []);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setNotificationPage('Notification'));
        void fetchData(currentPage);
    }, [dispatch, fetchData, currentPage]);

    return (
        <>
            <div>
                <>
                    <div className="flex justify-end mb-2">
                        <Button
                            onClick={()=>navigate('/add-notification')}
                            className='text-[#2967ff]'
                            // style={{ color: '#2967ff', backgroundColor: '#ffffff' }}
                        >
                            +Add New Notification
                        </Button>
                    </div>
                    {loading ? (
                        <Flex gap="middle" className="w-full h-full justify-center ">
                            <Spin size="large" />
                        </Flex>
                    ) : (
                        <>
                            <Card title="Notifications" className="m-2">                                
                                <Table
                                    dataSource={notificationData}
                                        pagination={{
                                            total: total,
                                            current: currentPage,
                                            onChange: (page) => {
                                                fetchData(page);
                                            },
                                        }}
                                    columns={notifications_data_col}
                                    sticky
                                    className="w-full"
                                ></Table>
                            </Card>
                        </>
                    )}
                </>
            </div>
        </>
    );
}

export default Notifications;
