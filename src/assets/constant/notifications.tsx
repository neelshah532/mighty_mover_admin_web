import { ColumnProps } from 'antd/es/table';
import { AlignType, notification } from '../dto/data.type';

export const NOTIFICATION_DATA_COL = (currentPage: number, pageSize: number): ColumnProps<notification>[] => [
    {
        title: 'Sr.No.',
        dataIndex: 'id',
        render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
        align: 'center' as AlignType,
        width:'70px'
    },
    {
        title: 'Title',
        dataIndex: 'title',
        align: 'center' as AlignType,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        width:'450px'
    },
];