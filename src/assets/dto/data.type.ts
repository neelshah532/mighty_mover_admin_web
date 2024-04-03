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
export type { Order, DeliveryPartner };
export type { DataType };
export { shipdata, paymenttype, deliverypartner, vehicletype };
