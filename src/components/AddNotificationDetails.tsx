import { useState } from 'react';
import { Button, DatePicker, Form, Input, message, Select, TimePicker, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import type { UploadProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import http from '../http/http';
import formhttp from '../http/Form_data';

const { Dragger } = Upload;

const AddNotificationDetails = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        image: null,
        status: ''
    });

    const [addImageButton, setAddImageButton] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState('');
    const [disableDateTime, setDisableDateTime] = useState(true); // Initially, date and time fields are disabled

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            setAddImageButton(true);
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        beforeUpload: file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({
                    ...formData,
                    image: file // Update formData to hold the uploaded image
                });
            };
            reader.readAsDataURL(file);
            return false; // Prevent upload
        },
    };

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (_, dateString: string) => {
        setFormData({
            ...formData,
            date: dateString
        });
    };

    const handleTimeChange = (_, timeString: string) => {
        setFormData({
            ...formData,
            time: timeString
        });
    };

    const handleStatusChange = (value) => { // Handler for status change
        setFormData({
            ...formData,
            status: value
        });
        if (value === '0') { // Publish
            setDisableDateTime(true); // Disable date and time fields
        } else {
            setDisableDateTime(false); // Enable date and time fields
        }
    };

    const addData = async () => {
        try {
            if (formData.status === '1' && (!formData.date || !formData.time)) {
                toast.error('Please select both date and time for scheduled notifications.');
                return;
            }
            const data = await http.post('/api/v1/notifications', formData);
            toast.success(data.data.message);
            console.log(formData);
        } catch (error) {
            console.error(error);
        }
    };

    const [image, setImage] = useState<File | null>(null);

    const handleImage = (info) => {
        console.log('handleImage function called');
        console.log('Info:', info);
        setImage(info.fileList[0].originFileObj);
        console.log('File:', info.fileList[0].originFileObj);
        setAddImageButton(true);
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('image', image as Blob);
        formData.append('type', 'notification');
        try {
            const response = await formhttp.post("/api/v1/document", formData);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="grid grid-cols-2">
                <div className="p-5">
                    <div className="flex flex-col gap-5">
                        <div className="flex text-black">
                            <h1 className="text-2xl">Enter Details of Notification</h1>
                        </div>
                        <Form layout="vertical">
                            <div className="">
                                <Form.Item label="Notification Title">
                                    <Input className="p-2" onChange={(e) => handleInputChange('title', e.target.value)} />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label="Notification Text">
                                    <TextArea rows={3} onChange={(e) => handleInputChange('description', e.target.value)} />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label="Status">
                                    <Select onChange={handleStatusChange}> {/* Add onChange to handle status change */}
                                        <Select.Option value="0">Publish</Select.Option>
                                        <Select.Option value="1">Schedule</Select.Option>
                                        <Select.Option value="2">Draft</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='grid grid-cols-2 gap-5'>
                                <Form.Item label="Date">
                                    <DatePicker className='w-full p-2' onChange={handleDateChange} disabled={disableDateTime} />
                                </Form.Item>
                                <Form.Item label="Time">
                                    <TimePicker needConfirm={false} className='w-full p-2' format={"HH:mm"} onChange={handleTimeChange} disabled={disableDateTime} />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item label="Notification Image">
                                    {/* <Dragger {...props} onChange={handleImage}>
                                        <p className="ant-upload-drag-icon">
                                            <UploadOutlined />
                                        </p>
                                        <p className="ant-upload-text">Upload an Image</p>
                                        <p className="ant-upload-hint">JPG, JPEG, or PNG file formats accepted</p>
                                    </Dragger> */}
                                    <Dragger {...props} onChange={(info) => handleImage(info)}>
                                        <p className="ant-upload-drag-icon">
                                            <UploadOutlined />
                                        </p>
                                        <p className="ant-upload-text">Upload an Image</p>
                                        <p className="ant-upload-hint">JPG, JPEG, or PNG file formats accepted</p>
                                    </Dragger>
                                    <Button onClick={uploadImage} className={`${addImageButton ? 'block' : 'hidden'} w-full mt-2`}>Add Image</Button>
                                </Form.Item>
                                <div className='flex gap-5'>
                                    <Button onClick={addData} className='w-full'>Submit</Button>
                                    <Button onClick={() => navigate('/notifications')} className='w-full'>Cancel</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className='items-center flex justify-center'>
                    <div className=' p-3 border border-slate-600 rounded-xl'>
                        {imagePreview ? <img src={imagePreview} alt="Preview" className='w-full' /> : <div className='w-[90%] h-[50%] bg-gray-200 rounded-lg flex justify-center items-center text-gray-500 text-lg'>Image Preview</div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddNotificationDetails;
