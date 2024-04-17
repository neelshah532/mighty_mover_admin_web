import { Empty,Card,Table } from 'antd';
import { ORDER_TABLE,DATA_COL } from '../assets/constant/constant';
import { Order } from '../assets/dto/data.type';
import { ColumnProps } from 'antd/es/table';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPage } from '../redux/pageSlice';

export default function Order_page() {
    //use redux to display name of page
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPage('Order'));
    }, [dispatch]);

    const data: Order[] = ORDER_TABLE;
    const columns: ColumnProps<Order>[] = DATA_COL;

    return (
        <div>
            <div>
                {columns.length === 0 ? (
                    <Empty />
                ) : (
                    <>
                        <Card title="Order" className="m-2 random:w-1/2">
                            <Table
                                rowClassName="text-center"
                                dataSource={data}
                                pagination={{ pageSize: 4 }}
                                columns={columns}
                                bordered
                                sticky
                                className="w-full"
                            ></Table>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
}
