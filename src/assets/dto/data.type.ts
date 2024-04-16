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
    index: number;
    name: string;
    email: string;
    number: number;
    RegisterDate: string;
    status: boolean;
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
interface city {
    city_name: string;
    country_name: string;
    created_at: string;
    id: string;
    status: string | boolean;
    align?: AlignType | undefined;
}

interface UpdateCity {
    country_name: string;
    city_name: string;
}

export type { Order, DeliveryPartner, User, Categories, city, UpdateCity };
export type { DataType };
export { shipdata, paymenttype, deliverypartner, vehicletype };
