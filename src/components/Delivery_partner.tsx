import { Table,Empty,Card } from 'antd';
import { DeliveryPartner } from '../assets/dto/data.type';
import { DELIVERY_DATA_COL,DELIVERY_PARTNER } from '../assets/constant/constant';
import { ColumnProps } from 'antd/es/table';

export default function Delivery_partner() {
    const delivery_data = DELIVERY_PARTNER;
    const delivery_data_col: ColumnProps<DeliveryPartner>[] = DELIVERY_DATA_COL;
    return (
        <div>
            {delivery_data.length === 0 ? (
                <Empty />
            ) : (
                <>
                    <Card title="Delivery Partner" className="m-2">
                        <Table
                            rowClassName="text-center"
                            dataSource={delivery_data}
                            pagination={{ pageSize: 2 }}
                            columns={delivery_data_col}
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
