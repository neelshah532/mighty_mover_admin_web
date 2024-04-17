import { Empty,Table,Card } from 'antd';
import { PAYMENT_DATA,PAYMENT_DATA_COL } from '../assets/constant/constant';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPage } from '../redux/pageSlice';
export default function Payment_page() {
    //use redux to display name of page
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPage('Payment'));
    }, [dispatch]);
    const payment_colums = PAYMENT_DATA;
    const payment_data = PAYMENT_DATA_COL;
    return (
        <div>
            {payment_colums.length === 0 ? (
                <Empty />
            ) : (
                <>
                    <Card title="Payment" className="m-2">
                        <Table
                            rowClassName="text-center"
                            dataSource={payment_colums}
                            pagination={{ pageSize: 2 }}
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
