import { Role } from '../../redux/roleSlice';

interface DataType {
    key: React.Key;
    orderid: string;
    date: string;
    transid: string;
    customer: string;
    paystatus: boolean;
    shipstatus: number;
    isapproved: boolean;
    title: string;
}
enum shipdata {
    'cancel',
    'inprogess',
    'pending',
    'delivered',
}
enum paymenttype {
    stripe = 'Stripe',
    credit_debit = 'Credit_Debit',
    cash = 'Cash',
    upi = 'UPI',
}
enum deliverypartner {
    active = 'active',
    inactive = 'inactive',
}
enum vehicletype {
    'two-wheeler' = 'Two-Wheeler',
    'four-wheeler' = 'Four-Wheeler',
}

interface Order {
    key: string;
    orderid: string;
    date: string;
    transid: string;
    customer: string;
    totalprice: number;
    paystatus: boolean;
    shipstatus: shipdata; // Fix: Changed 'ShipData' to 'shipdata'
    isapproved: boolean;
}
interface DeliveryPartner {
    key: string;
    first: string;
    date: string;
    contact: string;
    address: string;
    email: string;
    vehicleType: vehicletype;
    vehicle: number;
    status: deliverypartner;
}

export type AlignType = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
interface User {
    id: string;
    first_name: string;
    email: string;
    contact: number;
    created_at: string;
    status: string | boolean;
    align?: AlignType | undefined;
}

interface Categories {
    id: string;
    name: string;
    description: string;
    status: string | boolean;
    created_at: string;
    align?: AlignType | undefined;
}
interface FormValues {
    first_name: string;
    last_name: string;
    email: string;
    role_name: string;
    password: string;
}
interface AdminsDisplay {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: string | boolean;
    role: string;
    align?: AlignType | undefined;
}
interface city {
    id: string;
    city_name: string;
    country_name: string;
    created_at: string;
    status: string | boolean;
    align?: AlignType | undefined;
}

interface UpdateCity {
    city_name: string;
    country_name: string;
}
interface coupon {
    id: string;
    coupon_code: string;
    coupon_type: string;
    description: string;
    discount_type: string;
    discount_value: number;
    expiry_date: string;
    status: string | boolean;
    max_usage_count: number;
}
interface blog {
    id: string;
    fk_document: string;
    author_name: string;
    title: string;
}
interface vehicle {
    id: string;
    length: number;
    max_weight: number;
    order_type: string;
    per_km_charge: number;
    vehicle_category: string;
    vehicle_num: string;
    widht: number;
}
interface staff_data {
    id: string;
    role: string;
    user: number;
    description: string;
}

interface addCategories {
    name: string;
    description: string;
    status: string | boolean;
}
interface addUsers {
    first_name: string;
    last_name: string;
    email: string;
    contact: number | string;
    password: string;
}

interface RootState {
    rolePermission: Role;
}
interface FileInfo {
    file: File;
}

interface PaymentInformation {
    index: number;
    id: string;
    amount: string | number;
    payment_date: string | number;
    payment_status: string ;
    payment_type: string;
    align? : AlignType | string;
}
interface role_data {
    id: string;
    role_name: string;
    description: string;
    created_at: string;
    // checkedValues: boolean;
}

export type {
    Order,
    DeliveryPartner,
    User,
    Categories,
    city,
    UpdateCity,
    coupon,
    blog,
    vehicle,
    staff_data,
    AdminsDisplay,
    addCategories,
    FileInfo,
    addUsers,
    PaymentInformation,
    role_data,
};
export type { DataType, FormValues, RootState };
export { shipdata, paymenttype, deliverypartner, vehicletype };
