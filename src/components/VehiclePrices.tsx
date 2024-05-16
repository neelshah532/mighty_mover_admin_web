import { Button, Card, Flex, Form, Input, Modal, Radio, Select, Spin, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import { AlignType, vehicle_prices } from "../assets/dto/data.type";
import { VEHICLE_PRICES_DATA_COL } from "../assets/constant/VehiclePrices";
import http from "../http/http";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { toast } from "sonner";

export default function VehiclePrices() {
    const [editIndex, setEditIndex] = useState(-1);
    const [vehicle, setVehicle] = useState([]);
    const [perkm, setPerKm] = useState();

    const fetchData = async () => {
        try{
            const response = await http.get("/api/v1/vehicle");
            setVehicle(response.data.data);
            // toast.success(response.data.message)
        }catch(err){
            console.log(err)
        }
    };

    const toggleEdit = (index:number) => {
        setEditIndex(index === editIndex ? -1 : index);
        fetchData();
    };

    
    const handleInputChange = (e, index) => {
        const { value } = e.target;
        setPerKm(value)
        setVehicle((prevVehicle) => {
            const updatedVehicle = [...prevVehicle];
            updatedVehicle[index].per_km_charge = value;
            return updatedVehicle;
        });
        };
        const saveEdit = async (id) => {
            try{
                const response = await http.patch(`/api/v1/vehicle/${id}`, { "per_km_charge": perkm })
                toast.success(response.data.message)
            }catch(err){
                console.log(err)
            }
            setEditIndex(-1);
        };
        
    useEffect(() => {
        fetchData();
    }, []);

    const handleStatus = async (record) => {
        try{
            const statusEnum = record.status === "active" ? 1 : 0;
            const response = await http.patch(`/api/v1/vehicle/${record.id}`,{"status":statusEnum}) 
            fetchData();
            console.log(response)
        }catch(err){
            console.log(err)
        }
    }

    const vehicle_prices_data_col: ColumnProps<vehicle_prices>[] = [
        ...VEHICLE_PRICES_DATA_COL,
        {
            title:"Status",
            dataIndex:"status",
            render:(_,record)=><Button onClick={()=>handleStatus(record)} className={`${record.status === "active" ? "text-green-500 border-green-500" : "text-red-500 border-red-500"}`}>{record.status === "active" ? "Active" : "Inactive"}</Button>
        },
        {
            title: "Per KM Charge",
            dataIndex: "per_km_charge",
            align: "center" as AlignType,
            render: (_, record, index) => (
                <Input
                    value={record.per_km_charge}
                    className="text-center"
                    disabled={editIndex !== index}
                    onChange={(e) => handleInputChange(e, index)}
                    style={{ color: "black" }}
                />
            ),
        },
        {
            title: "Action",
            dataIndex: "action",
            align: "center" as AlignType,
            render: (_, record, index) =>
                index === editIndex ? (
                    <>
                        <div className="flex gap-1 justify-center">
                            <Button onClick={() => saveEdit(record.id)}><TiTick/></Button>
                            <Button onClick={() => toggleEdit(index)}><RxCross1/></Button>
                        </div>
                    </>
                ) : (
                    <Button onClick={() => toggleEdit(index)}>Edit</Button>
                ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        vehicle_type: "",
        max_weight: "",
        length: "",
        height: "",
        per_km_charge: "",
        status: 0 // Assuming default status is active
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const response = await http.post("/api/v1/vehicle", formData);
            toast.success(response.data.message);
            setIsModalOpen(false);
            fetchData();
        } catch (err) {
            console.log(err);
        } 
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <div className="flex justify-end p-2">
                <Button onClick={showModal}>+Add New Vehicle</Button>
            </div>
            <Card title="Vehicle Prices" className="m-2">
                <Table
                    rowClassName="text-center"
                    columns={vehicle_prices_data_col}
                    pagination={{ pageSize: 10 }}
                    dataSource={vehicle}
                    bordered
                    sticky
                    className="w-full"
                />
            </Card>
            <Modal title="Add New Vehicle" open={isModalOpen} onOk={handleOk}  onCancel={handleCancel}>
                <Form>
                    <Form.Item label="Vehicle Type">
                        <Select
                            value={formData.vehicle_type}
                            onChange={(value) => setFormData({ ...formData, vehicle_type: value })}
                        >
                            <Select.Option value={3}>Tata Ace</Select.Option>
                            <Select.Option value={6}>bolero</Select.Option>
                           
                        </Select>
                    </Form.Item>
                    <Form.Item label="Max Weight">
                        <Input name="max_weight" value={formData.max_weight} onChange={handleFormInputChange} />
                    </Form.Item>
                    <Form.Item label="Length">
                        <Input name="length" value={formData.length} onChange={handleFormInputChange} />
                    </Form.Item>
                    <Form.Item label="Height">
                        <Input name="height" value={formData.height} onChange={handleFormInputChange} />
                    </Form.Item>
                    <Form.Item label="Per KM Charge">
                        <Input name="per_km_charge" value={formData.per_km_charge} onChange={handleFormInputChange} />
                    </Form.Item>
                    <Form.Item label="Status">
                        <Radio.Group name="status" value={formData.status} onChange={handleFormInputChange}>
                            <Radio value={0}>Active</Radio>
                            <Radio value={1}>Inactive</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
