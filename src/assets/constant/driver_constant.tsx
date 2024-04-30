import { ColumnProps } from "antd/es/table";
import { AlignType, driver } from "../dto/data.type";

export const DRIVER_DATA_COL:ColumnProps<driver>[] = [
    {
        title: 'Index',
        dataIndex: 'id',
        render: (_, __, index) => index + 1,
        align: 'center' as AlignType,
        width: "70px"
    },
    {
        title: 'Name',
        dataIndex: 'name',
        align: 'center' as AlignType,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        align: 'center' as AlignType,
    },
    {
        title: 'Contact',
        dataIndex: 'contact',
        align: 'center' as AlignType,
    },
    {
        title: 'Shift',
        dataIndex: 'shift',
        align: 'center' as AlignType,
    },
];