import { Empty,Table,Card, Button } from 'antd';
import { PAYMENT_DATA_COL } from '../assets/constant/constant';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPage } from '../redux/pageSlice';
import http from '../http/http';
import { toast } from 'sonner';
import { AlignType } from '../assets/dto/data.type';
export default function Payment_page() {

    const [paymentData,setPaymentData] = useState([]);
    const fetchData = async () => {
        try{
            const response = await http.get('/api/v1/payment-method')
            toast.success(response.data.message)
            setPaymentData(response.data.data)
            console.log(response.data.data)
        }
        catch(err){
            console.error("Something went wrong!",err)
        }
    }



    const updateData = async(record) => {
        try{
            const response = await http.patch(`/api/v1/payment-method/${record.id}`,{status:record.status === "active" ? 1 : 0})
            console.log(response)
            toast.success(response.data.message)
            fetchData();
        }catch(err){
            console.log(err)
        }
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPage('Payment'));
        fetchData();
    }, [dispatch]);
    const payment_data = [
        ...PAYMENT_DATA_COL,
        {
            title: 'Status',
            dataIndex: 'status',
            align: "center" as AlignType,
            render:(_,record) => <Button onClick={()=>updateData(record)} className={`${record.status==="active" ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>{record.status === "active" ? "Active" : "Inactive"}</Button>
        }
    ];
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
