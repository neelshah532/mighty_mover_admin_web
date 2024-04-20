import { ColumnProps } from "antd/es/table";
import { AlignType,vehicle } from "../dto/data.type";

export const VEHICLE_DATA_COL: ColumnProps<vehicle>[] = [
    {
        title: 'Index',
        dataIndex: 'id',
        render: (_, __, index) => index + 1,
        align: 'center' as AlignType,
        width:"70px"
    },
    {
        title: 'Vehicle No',
        dataIndex: 'vehicle_num',
        align: 'center' as AlignType,
        
    },
    {
        title: 'Category',
        dataIndex: 'vehicle_category',
        align: 'center' as AlignType,
    },
    {
        title: 'Type',
        dataIndex: 'order_type',
        align: 'center' as AlignType,
    },
    {
        title: 'KM Charge',
        dataIndex: 'per_km_charge',
        align: 'center' as AlignType,
    },
    {
        title: 'Max Weight',
        dataIndex: 'max_weight',
        align: 'center' as AlignType,
    },
    {
        title: 'Length',
        dataIndex: 'length',
        align: 'center' as AlignType,
    },
    {
        title: 'Width',
        dataIndex: 'width',
        align: 'center' as AlignType,
    },
  
];