import { Table,Empty,Card } from 'antd';
import { DeliveryPartner } from '../assets/dto/data.type';
import { DELIVERY_DATA_COL,DELIVERY_PARTNER } from '../assets/constant/constant';
import { ColumnProps } from 'antd/es/table';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setPage } from '../redux/pageSlice';

export default function Delivery_partner() {
    //use redux to display name of page
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPage('Delivery Page'));
    }, [dispatch]);
    //
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
