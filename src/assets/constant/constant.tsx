  import { IoCashOutline } from "react-icons/io5";
  import { FaCcStripe } from "react-icons/fa";
  import { FaRegCreditCard } from "react-icons/fa";
  import { MdSpeakerPhone } from "react-icons/md";
  enum shipdata{
    "cancel",
    "inprogess",
    "pending",
    "delivered"
  }
  enum paymenttype{
    stripe="Stripe",
    credit_debit="Credit_Debit",
    cash="Cash",
    upi="UPI"

  }
  export const DASHBOARD_CONTENT=[
      {
          TOTAL_ORDER:"Total Order",
          VAL:"VAL"
      },
      {
          TOTAL_ORDER:"Created Order",
          VAL:"VAL"
      },
      {
          TOTAL_ORDER:"Total Order",
          VAL:"VAL"
      },
      {
          TOTAL_ORDER:"Assigned Order",
          VAL:"VAL"
      },
      {
          TOTAL_ORDER:"Accepted Order",
          VAL:"VAL"
      },
      {
          TOTAL_ORDER:"Picked Order",
          VAL:"VAL"
      },
      {
          TOTAL_ORDER:"Departed Order",
          VAL:"VAL"
      },  {
          TOTAL_ORDER:"Delivered Order",
          VAL:"VAL"
      },  {
          TOTAL_ORDER:"Cancelled Order",
          VAL:"VAL"
      },  {
          TOTAL_ORDER:"Total User",
          VAL:"VAL"
      },
      {
          TOTAL_ORDER:"Total Delivery Partner",
          VAL:"VAL"
      },
      {
          TOTAL_ORDER:"Total Vehicle",
          VAL:"VAL"
      },
  ]
  export const ORDER_TABLE=[
    {
      key: '1',
      orderid: 'John Brown',
      date: 32,
      transid: 'NA',
      customer:"NA",
      totalprice:101,
      paystatus:false,
      shipstatus:shipdata.inprogess,
      isapproved:false
      
    },
    {
      key: '2',
      orderid: 'Jim Green',
      date: 42,
      transid: 'NA',
      customer:"Utkarsh",
      totalprice:101,
      paystatus:true,
      shipstatus:shipdata.delivered,
      isapproved:false
    },
    {
      key: '3',
      orderid: 'Joe Black',
      date: 32,
      transid: 'NA',
      customer:"NA",
      totalprice:101,
      paystatus:true,
      shipstatus:shipdata.cancel,
      isapproved:false
    },
    {
      key: '4',
      orderid: 'Jim Red',
      date: 32,
      transid: 'NA',
      customer:"NA",
      totalprice:101,
      paystatus:false,
      shipstatus:shipdata.pending,
      isapproved:false

    },
    {
        key: '5',
        orderid: 'Jim Red',
        date: 32,
        transid: 'NA',
        customer:"NA",
        totalprice:101,
        paystatus:true,
        shipstatus:shipdata.inprogess,
        isapproved:false

      },
      {
        key: '6',
        orderid: 'Jim Red',
        date: 32,
        transid: 'NA',
        customer:"Neel",
        totalprice:101,
        paystatus:false,
        shipstatus:shipdata.inprogess,
        isapproved:false

      },
      {
        key: '7',
        orderid: 'Jim Red',
        date: 32,
        transid: '123abc',
        customer:"Prit",
        totalprice:101,
        paystatus:false,
        shipstatus:shipdata.inprogess,
        isapproved:false

      },
      {
        key: '8',
        orderid: 'Jim Red',
        date: 32,
        transid: '54ASJD',
        customer:"NA",
        totalprice:102,
        paystatus:false,
        shipstatus:shipdata.inprogess,
        isapproved:true

      },
    ]
    const customerNames = Array.from(new Set(ORDER_TABLE.map(item => item.customer)))
    .map(name => ({ text: name,value:name }));
    const transid = Array.from(new Set(ORDER_TABLE.map(item => item.transid)))
    .map(name => ({ text: name,value:name }));
    const orderid = Array.from(new Set(ORDER_TABLE.map(item => item.orderid)))
    .map(name => ({ text: name,value:name }));
  export const DATA_COL=[
      {
        title: 'Order Id',
        dataIndex: 'orderid', 
        filters: orderid,
          filterSearch: true,
          onFilter: (value: string, record: any) =>
            record.orderid.toLowerCase().includes(value.toLowerCase())
      },
      {
        title: 'Date',
        dataIndex: 'date',
        sorter: (a:any, b:any) => a.date - b.date,
      },
      {
        title: 'Transaction Id',
        dataIndex: 'transid',
        filters: transid,
          filterSearch: true,
          onFilter: (value: string, record: any) =>
            record.transid.toLowerCase().includes(value.toLowerCase())
      },
      {
          title: 'Customer',
          dataIndex: 'customer',
          filters: customerNames,
          filterSearch: true,
          sorter: (a:any, b:any) => a.customer.localeCompare(b.customer),
          onFilter: (value: string, record: any) =>
            record.customer.toLowerCase().includes(value.toLowerCase())
        },
        {
          title: 'Total Price',
          dataIndex: 'totalprice',
        sorter: (a:any, b:any) => a.totalprice - b.totalprice,

          
        },
        {
          title: 'Payment Status',
          dataIndex: 'paystatus',
          render:(paystatus:boolean)=>{
            if(paystatus===false){

              return <div style={{"padding":"3px","borderRadius":"5px","color":"white","textAlign":"center","fontWeight":"600","fontSize":"medium"}} className="bg-red-600">Pending</div>
            }
            else{
              return <div style={{"padding":"3px","borderRadius":"5px","color":"white","textAlign":"center","fontWeight":"600","fontSize":"medium"}} className="bg-green-500">Paid</div>

            }
          },
          filters: [
            { text: 'Pending', value: false },
            { text: 'Paid', value: true },
          ],
          onFilter: (value: boolean, record: any) => record.paystatus === value,
          
        },
        {
          title: 'Shipping Status',
          dataIndex: 'shipstatus',
          render:(shipstatus:number)=>{
            console.log(shipstatus)
            if(shipstatus===0){

              return <div style={{"padding":"3px","borderRadius":"5px","color":"white","textAlign":"center","fontWeight":"600","fontSize":"medium"}} className="bg-red-600">Cancel</div>
            }
            else if(shipstatus===1){
              return <div style={{"padding":"3px","borderRadius":"5px","color":"white","textAlign":"center","fontWeight":"600","fontSize":"medium"}} className="bg-amber-500">In Progress</div>

            }
            else if(shipstatus===3){
              return <div style={{"padding":"3px","borderRadius":"5px","color":"white","textAlign":"center","fontWeight":"600","fontSize":"medium"}} className="bg-purple-600">Pending</div>

            }
            else{
              return <div style={{"padding":"3px","borderRadius":"5px","color":"white","textAlign":"center","fontWeight":"600","fontSize":"medium"}} className="bg-green-500">Delivered</div>

            }
          },
          filters: [
            { text: 'Cancel', value: 0 },
            { text: 'Pending', value: 3 },
            { text: 'In Progress', value: 1 },
            { text: 'Delivered', value: 2 },
          ],
          onFilter: (value: number, record: any) => record.shipstatus === value,
        },
        {
          title: 'Is Approved',
          dataIndex: 'isapproved',
          render:(isapproved:boolean)=>{
            if(isapproved===false){

              return <div style={{"padding":"5px","borderRadius":"5px","color":"white","textAlign":"center","fontWeight":"600","fontSize":"medium"}} className="bg-red-600">Pending</div>
            }
            else{
              return <div style={{"padding":"5px","borderRadius":"5px","color":"white","textAlign":"center","fontWeight":"600","fontSize":"medium"}} className="bg-green-500">Paid</div>

            }
          },
          filters: [
            { text: 'Pending', value: false },
            { text: 'Paid', value: true },
          ],
          onFilter: (value: boolean, record: any) => record.isapproved === value
        },
    ];

  export const PAYMENT_DATA=[
    {
      key:"1",
      image:paymenttype.stripe,
      amount:100,
      organiser_name:"prit",
      transfer_details:"prit.s.patel03@gmail.com",
      transfer_type:paymenttype.stripe,
      status:true,

    },
    {
      key:"2",
      image:paymenttype.credit_debit,
      amount:100,
      organiser_name:"Neel",
      transfer_details:"neel.s.patel03@gmail.com",
      transfer_type:paymenttype.credit_debit,
      status:false,

    },
    {
      key:"3",
      image:paymenttype.cash,
      amount:100,
      organiser_name:"Utkarsh",
      transfer_details:"ut.s.patel03@gmail.com",
      transfer_type:paymenttype.cash,
      status:true,

    },
    {
      key:"4",
      image:paymenttype.upi,
      amount:100,
      organiser_name:"Rahul",
      transfer_details:"rahul.s.patel03@gmail.com",
      transfer_type:paymenttype.upi,
      status:true,

    }

  ]

  export const PAYMENT_DATA_COL=[
    {
      title:"Index",
      dataIndex:"key",
    },
    {
      title:"Image",
      dataIndex:"image",
      render:(image:string)=>{
        console.log(image)
        if(image==="Stripe"){
          return <div style={{"display":"flex","justifyContent":"center","alignItems":"center"}}><FaCcStripe style={{fontSize:"xxx-large"}}/></div>
        }
        else if(image==="Credit_Debit"){
          return <div style={{"display":"flex","justifyContent":"center","alignItems":"center"}}><FaRegCreditCard style={{fontSize:"xxx-large"}}/></div>
        }
        else if(image==="Cash"){
          return <div style={{"display":"flex","justifyContent":"center","alignItems":"center"}}><IoCashOutline style={{fontSize:"xxx-large"}}/></div>

        }
        else{
          return <div style={{"display":"flex","justifyContent":"center","alignItems":"center"}}><MdSpeakerPhone style={{fontSize:"xxx-large"}}/></div>

        }
      
      }

    },
    {
      title:"Transfer Type",
      dataIndex:"transfer_type",
    },
    {
      title:"Amount",
      dataIndex:"amount",
      render:(amount:number)=>{
        return <div className="font-semibold">Rs {amount}</div>
      }
    },
    {
      title:"Organiser Name",
      dataIndex:"organiser_name",
    },
    {
      title:"Transfer Details",
      dataIndex:"transfer_details",
      
    },
    {
      title:"Status",
      dataIndex:"status",
      render:(status:boolean)=>{
        if(status===true){
          return <div style={{"padding":"5px","borderRadius":"5px","color":"white","textAlign":"center","fontWeight":"600","fontSize":"medium"}} className="bg-green-500">Paid</div>

        }
        else{
          return <div style={{"padding":"5px","borderRadius":"5px","color":"white","textAlign":"center","fontWeight":"600","fontSize":"medium"}} className="bg-red-500">Pending</div>

        }
      }
    }
  ]
  export const POPOVER_PROFILE="Profile"
  export const POPOVER_LOGOUT="Logout"
  export const DASHBOARD_STATS_REVENUE="REVENUE"
  export const DASHBOARD_STATS_COSTS_MONEY="COSTS"
  export const DASHBOARD_STATS_PROFIT="PROFIT"
  export const DASHBOARD_STATS_REVENUE_VAL=10000000
  export const DASHBOARD_STATS_COSTS_MONEY_VAL=1000000
  export const DASHBOARD_STATS_PROFIT_VAL=DASHBOARD_STATS_REVENUE_VAL-DASHBOARD_STATS_COSTS_MONEY_VAL