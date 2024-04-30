import { ColumnProps } from 'antd/es/table';
import { AdminsDisplay, AlignType } from '../dto/data.type';
// import { useNavigate } from "react-router-dom";
// import { Button } from "antd/es/radio";
// const Redirect = (record: Partial<Categories>) => {
//     const navigate = useNavigate();
//     // navigate(`/categories/${record.id}`);
//     return <a onClick={() => navigate(`/categories/${record.id}`)}>{record.name}</a>;
// };

export const ADMIN_COL = (currentPage:number,pageSize:number): ColumnProps<AdminsDisplay>[] => [
    {
        title: 'Index',
        dataIndex: 'id',
        render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
        align: 'center' as AlignType,
    },
    {
        title: 'First Name',
        dataIndex: 'first_name',
        align: 'center' as AlignType,
    },
    {
        title: 'Last Name',
        dataIndex: 'last_name',
        align: 'center' as AlignType,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        align: 'center' as AlignType,
    },
];
