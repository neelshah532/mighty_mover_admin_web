import { ColumnProps } from "antd/es/table";
import { AlignType, staff_data } from "../dto/data.type";

export const staff_data_col: ColumnProps<staff_data>[]=[
    {
        title: 'Index',
        dataIndex: 'id',
        render: (_, __, index) => index + 1,
        align: 'center' as AlignType,
    },
    {
        title: 'City',
        dataIndex: 'city_name',
        align: 'center' as AlignType,
        
    },
    {
        title: 'Country',
        dataIndex: 'country_name',
        align: 'center' as AlignType,
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        align: 'center' as AlignType,
    },
]