import { ColumnProps } from "antd/es/table";
import { AlignType, city } from "../dto/data.type";

export const CITY_DATA_COL: ColumnProps<city>[] = [
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
  
];
