import { Empty,Card,Table } from 'antd';
import { ORDER_TABLE,DATA_COL } from '../assets/constant/constant';
import { Order } from '../assets/dto/data.type';
import { ColumnProps } from 'antd/es/table';

export default function Order_page() {
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
