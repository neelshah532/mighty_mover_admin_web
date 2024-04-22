import { ColumnProps } from "antd/es/table";
import { AlignType, notification} from "../dto/data.type";

export const NOTIFICATION_DATA_COL: ColumnProps<notification>[] = [
    {
        title: 'Index',
        dataIndex: 'id',
        render: (_, __, index) => index + 1,
        align: 'center' as AlignType,
        width: "70px"
    },
    {
        title: 'Notification Title',
        dataIndex: 'title',
        align: 'center' as AlignType,
        width:'400px'
    },
    {
        title: 'Date',
        dataIndex: 'date',
        align: 'center' as AlignType,
    },
    {
        title: 'Time',
        dataIndex: 'time',
        align: 'center' as AlignType,
    }
];