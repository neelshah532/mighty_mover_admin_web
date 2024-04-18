import { ColumnProps } from 'antd/es/table';
import { AlignType, Categories } from '../dto/data.type';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import { Button } from "antd/es/radio";
const Redirect = (record: Partial<Categories>) => {
    const navigate = useNavigate();
    // navigate(`/categories/${record.id}`);
    return <a onClick={() => navigate(`/categories/${record.id}`)}>{record.name}</a>;
};

export const CETAGORIES_DATA_COL=(currentPage:number,pageSize:number):ColumnProps<Categories>[] => [
    {
        title: 'Index',
        dataIndex: 'id',
        render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
        align: 'center' as AlignType,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        align: 'center' as AlignType,
        render: (_, record: Categories) => <Redirect id={record.id} name={record.name} />,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        align: 'center' as AlignType,
    },
    {
        title: 'Created Date    ',
        dataIndex: 'created_at',
        align: 'center' as AlignType,
    },
];

// export const Categories_page: Categories[] = [
//     {
//         id: '0aa08c76-f893-4c75-a4a3-31df03665ba1',
//         name: 'Electronics',
//         description: 'Mobile phones, tablets, chargers, headphones, and small gadgets.',
//         status: true,
//         created_at: '2024-04-15T09:13:15.087Z',
//     },
//     {
//         id: '0aa08c76-f893-4c75-a4a3-31df03663bc1',
//         name: 'steel',
//         description: 'Mobile phones, tablets, chargers, headphones, and small gadgets.',
//         status: true,
//         created_at: '2024-04-15T09:13:15.087Z',
//     },
//     {
//         id: '0aa08c76-f893-4c75-a4a3-31df03662cf1',
//         name: 'food',
//         description: 'Mobile phones, tablets, chargers, headphones, and small gadgets.',
//         status: false,
//         created_at: '2024-04-15T09:13:15.087Z',
//     },
//     {
//         id: '0aa08c76-f893-4c75-a4a3-31df036652s1',
//         name: 'Electronics',
//         description: 'Mobile phones, tablets, chargers, headphones, and small gadgets.',
//         status: false,
//         created_at: '2024-04-15T09:13:15.087Z',
//     },
// ];
