import { ColumnProps } from "antd/es/table";
import { AlignType, vehicle_prices } from "../dto/data.type";

export const VEHICLE_PRICES_DATA_COL: ColumnProps<vehicle_prices>[] = [
    {
        title: 'Index',
        dataIndex: 'id',
        render: (_, __, index) => index + 1,
        align: 'center' as AlignType,
        width: "70px"
    },
    {
        title: 'Vehicle Type',
        dataIndex: 'vehicle_type',
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
        title: 'Height',
        dataIndex: 'height',
        align: 'center' as AlignType,
    }
];