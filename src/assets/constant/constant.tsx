import { IoCashOutline } from 'react-icons/io5';
import { FaCcStripe, FaHome, FaRegUserCircle } from 'react-icons/fa';
import { FaRegCreditCard } from 'react-icons/fa';
import { MdOutlineCategory, MdOutlineContactPage, MdOutlinePayment, MdSpeakerPhone } from 'react-icons/md';
import { ColumnProps } from 'antd/es/table';
import { Order, DeliveryPartner, shipdata, paymenttype, deliverypartner, vehicletype, User, AlignType } from '../dto/data.type';
import { IoMdSettings } from 'react-icons/io';
import { BiSolidMessageEdit } from 'react-icons/bi';
import { RiUserSettingsFill } from 'react-icons/ri';
import { TbSettingsCog } from 'react-icons/tb';
import { FaCity } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";
import { FaMotorcycle } from "react-icons/fa6";
import { RiUserSettingsLine } from "react-icons/ri";

export const DASHBOARD_CONTENT = [
    {
        TOTAL_ORDER: 'Total Order',
        VAL: 'VAL',
    },
    {
        TOTAL_ORDER: 'Created Order',
        VAL: 'VAL',
    },
    {
        TOTAL_ORDER: 'Total Order',
        VAL: 'VAL',
    },
    {
        TOTAL_ORDER: 'Assigned Order',
        VAL: 'VAL',
    },
    {
        TOTAL_ORDER: 'Accepted Order',
        VAL: 'VAL',
    },
    {
        TOTAL_ORDER: 'Picked Order',
        VAL: 'VAL',
    },
    {
        TOTAL_ORDER: 'Departed Order',
        VAL: 'VAL',
    },
    {
        TOTAL_ORDER: 'Delivered Order',
        VAL: 'VAL',
    },
    {
        TOTAL_ORDER: 'Cancelled Order',
        VAL: 'VAL',
    },
    {
        TOTAL_ORDER: 'Total User',
        VAL: 'VAL',
    },
    {
        TOTAL_ORDER: 'Total Delivery Partner',
        VAL: 'VAL',
    },
    {
        TOTAL_ORDER: 'Total Vehicle',
        VAL: 'VAL',
    },
];
export const ORDER_TABLE: Order[] = [
    {
        key: '1',
        orderid: 'John Brown',
        date: '2023-11-24T09:21:17+05:30',
        transid: 'NA',
        customer: 'NA',
        totalprice: 101,
        paystatus: false,
        shipstatus: shipdata.inprogess,
        isapproved: false,
    },
    {
        key: '2',
        orderid: 'Jim Green',
        date: '2024-07-12T19:47:28+05:30',
        transid: 'NA',
        customer: 'Utkarsh',
        totalprice: 101,
        paystatus: true,
        shipstatus: shipdata.delivered,
        isapproved: false,
    },
    {
        key: '3',
        orderid: 'Joe Black',
        date: '2023-04-17T22:46:12+05:30',
        transid: 'NA',
        customer: 'NA',
        totalprice: 101,
        paystatus: true,
        shipstatus: shipdata.cancel,
        isapproved: false,
    },
    {
        key: '4',
        orderid: 'Jim Red',
        date: '2024-01-18T13:44:19+05:30',
        transid: 'NA',
        customer: 'NA',
        totalprice: 101,
        paystatus: false,
        shipstatus: shipdata.pending,
        isapproved: false,
    },
    {
        key: '5',
        orderid: 'Jim Red',
        date: '2024-10-04T02:31:36+05:30',
        transid: 'NA',
        customer: 'NA',
        totalprice: 101,
        paystatus: true,
        shipstatus: shipdata.inprogess,
        isapproved: false,
    },
    {
        key: '6',
        orderid: 'Jim Red',
        date: '2023-07-04T18:15:44+05:30',
        transid: 'NA',
        customer: 'Neel',
        totalprice: 101,
        paystatus: false,
        shipstatus: shipdata.inprogess,
        isapproved: false,
    },
    {
        key: '7',
        orderid: 'Jim Red',
        date: '2024-04-30T13:55:27+05:30',
        transid: '123abc',
        customer: 'Prit',
        totalprice: 101,
        paystatus: false,
        shipstatus: shipdata.inprogess,
        isapproved: false,
    },
    {
        key: '8',
        orderid: 'Jim Red',
        date: '2023-11-17T08:50:17+05:30',
        transid: '54ASJD',
        customer: 'NA',
        totalprice: 102,
        paystatus: false,
        shipstatus: shipdata.inprogess,
        isapproved: true,
    },
];
const customerNames = Array.from(new Set(ORDER_TABLE.map((item) => item.customer))).map((name) => ({
    text: name,
    value: name,
}));
const transid = Array.from(new Set(ORDER_TABLE.map((item) => item.transid))).map((name) => ({
    text: name,
    value: name,
}));
const orderid = Array.from(new Set(ORDER_TABLE.map((item) => item.orderid))).map((name) => ({
    text: name,
    value: name,
}));
export const DATA_COL: ColumnProps<Order>[] = [
    {
        title: 'Order Id',
        dataIndex: 'orderid',
        filters: orderid,
        filterSearch: true,
        onFilter: (value: React.Key | boolean, record: Order) =>
            typeof value === 'string' && record.orderid.toLowerCase().includes(value.toLowerCase()),
    },
    {
        title: 'Date',
        dataIndex: 'date',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        sorter: (a: Order, b: Order) => Number(new Date(a.date)) - Number(new Date(b.date)),
    },
    {
        title: 'Transaction Id',
        dataIndex: 'transid',
        filters: transid,
        filterSearch: true,
        onFilter: (value: React.Key | boolean, record: Order) =>
            typeof value === 'string' && record.transid.toLowerCase().includes(value.toLowerCase()),
    },
    {
        title: 'Customer',
        dataIndex: 'customer',
        filters: customerNames,
        filterSearch: true,
        sorter: (a: Order, b: Order) => a.customer.localeCompare(b.customer),
        onFilter: (value: React.Key | boolean, record: Order) =>
            typeof value === 'string' && record.customer.toLowerCase().includes(value.toLowerCase()),
    },
    {
        title: 'Total Price',
        dataIndex: 'totalprice',
        sorter: (a: Order, b: Order) => a.totalprice - b.totalprice,
    },
    {
        title: 'Payment Status',
        dataIndex: 'paystatus',
        render: (paystatus: boolean) => {
            if (paystatus === false) {
                return (
                    <div
                        style={{
                            padding: '3px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            border: '1px solid #dc2626',
                            color: "#dc2626",
                            backgroundColor: "#FDF4F5"
                        }}
                    >
                        Pending
                    </div>
                );
            } else {
                return (
                    <div
                        style={{
                            padding: '3px',
                            borderRadius: '5px',

                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            border: '1px solid #22c55e',
                            color: "#22c55e",
                            backgroundColor: "#F2FCF7"

                        }}
                    >
                        Paid
                    </div>
                );
            }
        },
        filters: [
            { text: 'Pending', value: false },
            { text: 'Paid', value: true },
        ],
        onFilter: (value: React.Key | boolean, record: Order) => record.paystatus === value,
    },
    {
        title: 'Shipping Status',
        dataIndex: 'shipstatus',
        render: (shipstatus: number) => {
            if (shipstatus === 0) {
                return (
                    <div
                        style={{
                            padding: '3px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            border: '1px solid #dc2626',
                            color: "#dc2626",
                            backgroundColor: "#FDF4F5"
                        }}
                    >
                        Cancel
                    </div>
                );
            } else if (shipstatus === 1) {
                return (
                    <div
                        style={{
                            padding: '3px',
                            borderRadius: '5px',
                            color: '#f59e0b',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            border: "1px solid #f59e0b",
                            backgroundColor: ""
                        }}
                    >
                        In Progress
                    </div>
                );
            } else if (shipstatus === 3) {
                return (
                    <div
                        style={{
                            padding: '3px',
                            borderRadius: '5px',
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            backgroundColor: '#9333ea',
                        }}
                    >
                        Pending
                    </div>
                );
            } else {
                return (
                    <div
                        style={{
                            padding: '3px',
                            borderRadius: '5px',

                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            border: '1px solid #22c55e',
                            color: "#22c55e",
                            backgroundColor: "#F2FCF7"
                        }}
                    >
                        Delivered
                    </div>
                );
            }
        },
        filters: [
            { text: 'Cancel', value: 0 },
            { text: 'Pending', value: 3 },
            { text: 'In Progress', value: 1 },
            { text: 'Delivered', value: 2 },
        ],
        onFilter: (value: React.Key | boolean, record: Order) => record.shipstatus === value,
    },
    {
        title: 'Is Approved',
        dataIndex: 'isapproved',
        render: (isapproved: boolean) => {
            if (isapproved === false) {
                return (
                    <div
                        style={{
                            padding: '3px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            border: '1px solid #dc2626',
                            color: "#dc2626",
                            backgroundColor: "#FDF4F5"
                        }}
                    >
                        Pending
                    </div>
                );
            } else {
                return (
                    <div
                        style={{
                            padding: '3px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            border: '1px solid #dc2626',
                            color: "#dc2626",
                            backgroundColor: "#FDF4F5"
                        }}
                    >
                        Paid
                    </div>
                );
            }
        },
        filters: [
            { text: 'Pending', value: false },
            { text: 'Paid', value: true },
        ],
        onFilter: (value: React.Key | boolean, record: Order) => record.isapproved === value,
    },
];

export const PAYMENT_DATA = [
    {
        key: '1',
        image: paymenttype.stripe,
        amount: 100,
        organiser_name: 'prit',
        transfer_details: 'prit.s.patel03@gmail.com',
        transfer_type: paymenttype.stripe,
        status: true,
    },
    {
        key: '2',
        image: paymenttype.credit_debit,
        amount: 100,
        organiser_name: 'Neel',
        transfer_details: 'neel.s.patel03@gmail.com',
        transfer_type: paymenttype.credit_debit,
        status: false,
    },
    {
        key: '3',
        image: paymenttype.cash,
        amount: 100,
        organiser_name: 'Utkarsh',
        transfer_details: 'ut.s.patel03@gmail.com',
        transfer_type: paymenttype.cash,
        status: true,
    },
    {
        key: '4',
        image: paymenttype.upi,
        amount: 100,
        organiser_name: 'Rahul',
        transfer_details: 'rahul.s.patel03@gmail.com',
        transfer_type: paymenttype.upi,
        status: true,
    },
];

export const PAYMENT_DATA_COL = [
    {
        title: 'Index',
        dataIndex: 'key',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        render: (image: string) => {
            if (image === 'Stripe') {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FaCcStripe style={{ fontSize: 'xxx-large' }} />
                    </div>
                );
            } else if (image === 'Credit_Debit') {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FaRegCreditCard style={{ fontSize: 'xxx-large' }} />
                    </div>
                );
            } else if (image === 'Cash') {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IoCashOutline style={{ fontSize: 'xxx-large' }} />
                    </div>
                );
            } else {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <MdSpeakerPhone style={{ fontSize: 'xxx-large' }} />
                    </div>
                );
            }
        },
    },
    {
        title: 'Transfer Type',
        dataIndex: 'transfer_type',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        render: (amount: number) => {
            return <div className="font-semibold">Rs {amount}</div>;
        },
    },
    {
        title: 'Organiser Name',
        dataIndex: 'organiser_name',
    },
    {
        title: 'Transfer Details',
        dataIndex: 'transfer_details',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render: (status: boolean) => {
            if (status === true) {
                return (
                    <div
                        style={{
                            padding: '3px',
                            borderRadius: '5px',

                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            border: '1px solid #22c55e',
                            color: "#22c55e",
                            backgroundColor: "#F2FCF7"
                        }}
                    >
                        Paid
                    </div>
                );
            } else {
                return (
                    <div
                        style={{
                            padding: '3px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            border: '1px solid #dc2626',
                            color: "#dc2626",
                            backgroundColor: "#FDF4F5"
                        }}
                    >
                        Pending
                    </div>
                );
            }
        },
    },
];
export const LOGIN_DATA_STRING = {
    TITLE: 'Login to your account',
    SUBTITLE: 'Welcome to Mighty Movers',
    LOGIN: 'Login',
    SUBMIT: 'Login',
    EMAIL: 'Email',
    PASSWORD: 'Password',
};

export const POPOVER_PROFILE = 'Profile';
export const POPOVER_LOGOUT = 'Logout';
export const DASHBOARD_STATS_REVENUE = 'REVENUE';
export const DASHBOARD_STATS_COSTS_MONEY = 'COSTS';
export const DASHBOARD_STATS_PROFIT = 'PROFIT';
export const DASHBOARD_STATS_REVENUE_VAL = 10000000;
export const DASHBOARD_STATS_COSTS_MONEY_VAL = 1000000;
export const DASHBOARD_STATS_PROFIT_VAL = DASHBOARD_STATS_REVENUE_VAL - DASHBOARD_STATS_COSTS_MONEY_VAL;
export const COPYRIGHT = 'Copyright © 2024 Mighty Movers All rights reserved.';
export const TERMS = 'Term & Conditions | Privacy & Policy';

export const DELIVERY_PARTNER: DeliveryPartner[] = [
    {
        key: '1',
        first: 'John Brown',
        date: '2023-11-24T09:21:17+05:30',
        contact: '9499657878',
        address: '1476 Muba River',
        email: 'ki@cis.gd',
        vehicleType: vehicletype['two-wheeler'],
        vehicle: 15632801903,
        status: deliverypartner.active,
    },
    {
        key: '2',
        first: 'John Brown',
        date: '2023-11-24T09:21:17+05:30',
        contact: '9499657878',
        address: '1476 Muba River',
        email: 'onleaj@coduki.hr',
        vehicleType: vehicletype['four-wheeler'],
        vehicle: 45101328544,
        status: deliverypartner.inactive,
    },
    {
        key: '3',
        first: 'John Brown',
        date: '2023-11-24T09:21:17+05:30',
        contact: '9499657878',
        address: '1476 Muba River',
        email: 'bup@hubev.co.uk',
        vehicleType: vehicletype['four-wheeler'],
        vehicle: 46175602429,
        status: deliverypartner.active,
    },
    {
        key: '4',
        first: 'John Brown',
        date: '2023-11-24T09:21:17+05:30',
        contact: '9499657878',
        address: '1476 Muba River',
        email: 'kunuluot@luljap.kg',
        vehicleType: vehicletype['four-wheeler'],
        vehicle: 43839695137,
        status: deliverypartner.active,
    },
];
export const DELIVERY_DATA_COL: ColumnProps<DeliveryPartner>[] = [
    {
        title: 'Index',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'first',
    },
    {
        title: 'Date of Joining',
        dataIndex: 'date',
    },
    {
        title: 'Contact',
        dataIndex: 'contact',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Vehicle Type',
        dataIndex: 'vehicleType',
        filters: [
            { text: 'Two-Wheeler', value: 'Two-Wheeler' },
            { text: 'Four-Wheeler', value: 'Four-Wheeler' },
        ],
        onFilter: (value: React.Key | boolean, record: DeliveryPartner) =>
            typeof value === 'string' && record.vehicleType === value,
    },
    {
        title: 'Vehicle Number',
        dataIndex: 'vehicle',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        filters: [
            { text: 'Active', value: 'active' },
            { text: 'InActive', value: 'inactive' },
        ],
        onFilter: (value: React.Key | boolean, record: DeliveryPartner) => record.status === value,

        render: (status: string) => {
            if (status === 'active') {
                return (
                    <div
                        style={{
                            padding: '5px',
                            borderRadius: '5px',
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            backgroundColor: '#22c55e',
                        }}
                    >
                        Active
                    </div>
                );
            } else {
                return (
                    <div
                        style={{
                            padding: '5px',
                            borderRadius: '5px',
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 'medium',
                            backgroundColor: '#dc2626',
                        }}
                    >
                        Inactive
                    </div>
                );
            }
        },
    },
];
export const PIE_DATA = {
    labels: ['COSTS', 'PROFIT_VAL', 'REVENUE_VAL'],
    datasets: [
        {
            label: '# of Votes',
            data: [DASHBOARD_STATS_COSTS_MONEY_VAL, DASHBOARD_STATS_PROFIT_VAL, DASHBOARD_STATS_REVENUE_VAL],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1,
        },
    ],
};

export const LINE_CHART_LABELS = ORDER_TABLE.map((orderdata) => {
    return orderdata.date.substring(0, 10);
});
const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomData = (length: number, min: number, max: number): number[] => {
    const data: number[] = [];
    for (let i = 0; i < length; i++) {
        data.push(getRandomNumber(min, max));
    }
    return data;
};

export const LINE_CHART = {
    labels: LINE_CHART_LABELS,
    datasets: [
        {
            label: 'Dataset 1',
            data: generateRandomData(LINE_CHART_LABELS.length, -1000, 1000),
            borderColor: '#2967ff',
            backgroundColor: '#2967ff',
        },
    ],
};
export const PURCHASE_ORDER_STATUS = 'Purchase Order Status';
export const DELIVERED = 'Delivered';
export const INPROGRESS = 'In Progress';
export const NOTDELIVERED = 'Not Active';
export const MONTHLY_DATA = ' You need a bit more effort to hit monthly target';
export const MONTHLY_TARGET = ' Monthly Target';


export const SETTINGS_STRING = {
    section1: [
        {
            label: "Per KM fee",
            name: "per_km_fee",
            message: "Please Enter per KM fee!",
            placeholder: "Enter per KM fee!",
            req: true
        }, {
            label: "Extra fee",
            name: "extra_fee",
            message: "Please Enter Extra fee!",
            placeholder: "Enter Extra fee",
            req: true
        }, {
            label: "Instagram",
            name: "instagram",
            message: "Please Paste Instagram Link!",
            placeholder: "Enter or Paste Instagram Link",
            req: true
        }, {
            label: "Facebook",
            name: "facebook",
            message: "Please Paste Facebook Link!",
            placeholder: "Enter or Paste Facebook Link",
            req: true
        }, {
            label: "Linked In",
            name: "linked_in",
            message: "Please Paste LinkenIn Link!",
            placeholder: "Enter or Paste LinkedIn Link",
            req: true
        }, {
            label: "Twitter",
            name: "twitter",
            message: "Please Paste Twitter Link!",
            placeholder: "Enter or Paste Twitter Link",
            req: true
        }
    ]

}


export const BLOG_SETTINGS_STRING = {
    settings: [
        {
            label: "Author Name",
            name: "author_name",
            message: "Please Enter Author Name!",
            placeholder: "Enter Author Name",
            req: true
        }, {
            label: "Title",
            name: "title",
            message: "Please Enter Title!",
            placeholder: "Enter Title",
            req: true
        }
    ]
}

// const[Status, setStatus] = useState('');


export const USER_TABLE: User[] = [
    {
        index: 1,
        name: 'Utkarsh',
        email: 'utkarsh@solguruz.com',
        number: 9898989898,
        RegisterDate: '2023-11-24 | 05:30',
        status: true,
    },
    {
        index: 2,
        name: 'Rahul',
        email: 'rahul@solguruz.com',
        number: 1212121212,
        RegisterDate: '2023-11-24 | 05:30',
        status: true,
    },
    {
        index: 3,
        name: 'Tushar',
        email: 'tushar@solguruz.com',
        number: 3535313234,
        RegisterDate: '2023-11-24 | 05:30',
        status: true,
    },
    {
        index: 4,
        name: 'Neel',
        email: 'neel@solguruz.com',
        number: 7894561237,
        RegisterDate: '2023-11-24 | 05:30',
        status: false,
    },
    {
        index: 5,
        name: 'Prit',
        email: 'prit@solguruz.com',
        number: 1234567891,
        RegisterDate: '2023-11-24 | 05:30',
        status: false,
    },
    {
        index: 6,
        name: 'Ketan',
        email: 'ketan@solguruz.com',
        number: 1212121212,
        RegisterDate: '2023-11-24 | 05:30',
        status: false,
    },
    {
        index: 7,
        name: 'Suraj',
        email: 'suraj@solguruz.com',
        number: 3535313234,
        RegisterDate: '2023-11-24 | 05:30',
        status: false,
    },
    {
        index: 8,
        name: 'Aayush',
        email: 'aayush@solguruz.com',
        number: 7894561237,
        RegisterDate: '2023-11-24 | 05:30',
        status: false,
    },
];



export const USER_DATA_COL = [
    {
        title: 'Sr no.',
        dataIndex: 'index',
        align: 'center' as AlignType
    },
    {
        title: 'Name',
        dataIndex: 'name',
        align: 'center' as AlignType
    },
    {
        title: 'Email',
        dataIndex: 'email',
        align: 'center' as AlignType
    },
    {
        title: 'Number',
        dataIndex: 'number',
        align: 'center' as AlignType
    },
    {
        title: 'Register Date',
        dataIndex: 'RegisterDate',
        align: 'center' as AlignType
    },
];

export const SIDE_PANEL = {
    menu: [
        {
            name: 'Dashboard',
            navigate: '/',
            icon: <FaHome />,
        },
        {
            name: 'Order',
            navigate: '/orders',
            icon: <MdOutlineContactPage />,
        },
        {
            name: 'Delivery Partner',
            navigate: '/delivery-partner',
            icon: <FaRegUserCircle />,
        },
        {
            name: 'Payment',
            navigate: '/payments',
            icon: <MdOutlinePayment />,
        },
        {
            name: 'Categories',
            navigate: '/categories',
            icon: <MdOutlineCategory />,
        },
        {
            name: 'City',
            navigate: '/city',
            icon: <FaCity />,
        },
        {
            name: 'Coupon',
            navigate: '/coupon',
            icon: <RiCoupon2Fill />,
        },
        {
            name: 'Blog',
            navigate: '/show_edit_delete',
            icon: <BiSolidMessageEdit />,
        },
        {
            name: 'Vehicle',
            navigate: '/vehicle',
            icon: <FaMotorcycle />,
        },
        {
            name: 'Staff Managment',
            navigate: '/staff-management',
            icon: <RiUserSettingsLine />,
        },
    ],
    submenu_key: 'settings',
    submenu_title: 'Settings',
    icon: <IoMdSettings />,
    submenu: [
        {
            navigate: '/settings/order-settings',
            icon: <TbSettingsCog />,
            name: 'Order Settings',
        },
        // {
        //     navigate: '/settings/blog-settings',
        //     icon: <BiSolidMessageEdit />,
        //     name: 'Blog Settings',
        // },
        {
            navigate: '/settings/user-settings',
            icon: <RiUserSettingsFill />,
            name: 'User Settings',
        },
    ],
};