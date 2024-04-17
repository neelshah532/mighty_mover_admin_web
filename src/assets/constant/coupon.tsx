import { ColumnProps } from "antd/es/table";
import { AlignType, coupon } from "../dto/data.type";

export const COUPON_DATA_COL: ColumnProps<coupon>[] = [
    {
        title: 'Index',
        dataIndex: 'id',
        render: (_, __, index) => index + 1,
        align: 'center' as AlignType,
        width: '70px',

    },
    {
        title: 'Coupon Title',
        dataIndex: 'coupon_code',
        align: 'center' as AlignType,
        
    },
    {
        title: 'Description',
        dataIndex: 'description',
        align: 'center' as AlignType,
        width: '200px',

    },
    {
        title: 'Vehicle Type',
        dataIndex: 'coupon_type',
        align: 'center' as AlignType,
        width: '120px',

    },
  
    {
        title: 'Value',
        dataIndex: 'discount_value',
        align: 'center' as AlignType,
        width: '70px',

    },
    {
        title: 'Expiry Date',
        dataIndex: 'expiry_date',
        align: 'center' as AlignType,
    },
    {
        title: 'Max Use',
        dataIndex: 'max_usage_count',
        align: 'center' as AlignType,
        width: '70px',

    },
  
];
