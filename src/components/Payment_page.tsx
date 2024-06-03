import { Empty, Table, Card } from 'antd';
import { PAYMENT_DATA_COL } from '../assets/constant/constant';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPage } from '../redux/pageSlice';
import http from '../http/http';
import { toast } from 'sonner';
export default function Payment_page() {
    const [paymentData, setPaymentData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await http.get('/api/v1/payment-method');
            toast.success(response.data.message);
            setPaymentData(response.data.data);
        } catch (err) {
            console.error('Something went wrong!', err);
        }
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPage('Payment'));
        fetchData();
    }, [dispatch]);
    const payment_data = PAYMENT_DATA_COL;
    return (
        <div>
            {paymentData.length === 0 ? (
                <Empty />
            ) : (
                <>
                    <Card title="Payment" className="m-2">
                        <Table
                            rowClassName="text-center"
                            dataSource={paymentData}
                            // pagination={{ pageSize: 2 }}

                            columns={payment_data}
                            bordered
                            sticky
                            className="w-full"
                        ></Table>
                    </Card>
                </>
            )}
        </div>
    );
}
