import { ColumnProps } from "antd/es/table";
import { AlignType, PaymentInformation } from "../dto/data.type";

export const PAYMENTINFOMATION_DATA_COL = (currentPage: number, pageSize: number): ColumnProps<PaymentInformation>[] => [
    {
        title: 'Sr.No.',
        dataIndex: 'index',
        render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,

        align: 'center' as AlignType,
    },
    // {
    //     title: 'Name',
    //     dataIndex: 'name',
    //     align: 'center' as AlignType,
    // },
    {
        title: 'Transactional Id',
        dataIndex: 'id',
        align: 'center' as AlignType,
    },
    {
        title: 'Transaction Amount',
        dataIndex: 'amount',
        align: 'center' as AlignType,
    },
    {
        title: 'Transaction Date',
        dataIndex: 'payment_date',
        align: 'center' as AlignType,
    },
    {
        title: 'Payment Status',
        dataIndex: 'payment_status',
        align: 'center' as AlignType,
    },
    {
        title: 'Payment Method',
        dataIndex: 'payment_type',
        align: 'center' as AlignType,
    },
];
