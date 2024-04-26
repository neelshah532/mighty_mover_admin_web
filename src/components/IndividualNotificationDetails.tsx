import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setNotificationPage } from '../redux/notificationSlice';
import { Card, Image, Form, Input, DatePicker, Button, Select } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';


import customParseFormat from 'dayjs/plugin/customParseFormat';
import http from '../http/http';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { notification } from '../assets/dto/data.type';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

dayjs.extend(customParseFormat);

const onTimeChange: TimePickerProps['onChange'] = (time, timeString) => {
  console.log(time, timeString);
};

const { TextArea } = Input;

const onDateChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};
// export default function IndividualNotificationDetails() {
//   const navigate = useNavigate();
//   const [indiNoti,setIndiNoti] = useState<notification>()
//   const [isDisabled, setIsDisabled] = useState<boolean>(false)
//   const {id} = useParams();
//   const fetchNotification = async()=>{
//     try{
//       const response = await http.get(`api/v1/notifications/${id}`)
//       toast.success(response.data.message)
//       setIndiNoti(response.data.data)
//       response.data.data.notification_status === "published" ? setIsDisabled(true) : setIsDisabled(false)
//     }catch(err){
//       console.error(err)
//     }
//   }
  

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(setNotificationPage('SubNotification'));
//     fetchNotification();
//   }, []);
  

//   const patchNotification = async() => { 
//       try{
//         const response = await http.patch(`/api/v1/notifications/${id}`,{})
//         toast.success(response.data.message)
//         console.log(response)
//       }catch(err){
//         console.error("notification cannot be updated",err)
//       }finally{
//         // navigate('/notifications')
//         console.log()
//       }
//   }

//   return (
//     <>
//       <Card>
//         <div>
//           <div className='flex flex-col mb-3'>
//             <p>Notification Image</p>
//             <Image
//               width={100}
//               height={100}
//               src="error"
//             />
//           </div>

//           <div>

//             <Form
//               // labelCol={{ span: 4 }}
//               // wrapperCol={{ span: 14 }}
//               layout="vertical"
//             // style={{ maxWidth: 600 }}
//             >
//               <div className='grid grid-cols-2 gap-5'>
//                 <Form.Item
//                   label="Notification Title"
//                 >
//                   <Input className='p-2' value={indiNoti?.title} onChange={(e) => setIndiNoti(prevState => ({ ...prevState, title: e.target.value }))} style={{ color: 'black' }} disabled={isDisabled}/>
//                 </Form.Item>
//                 <Form.Item
//                   label="Status"
//                 >
//                   <Input className='p-2' value={indiNoti?.notification_status} style={{ color: 'black' }} disabled={isDisabled}/>
//                 </Form.Item>
//               </div>
//               <div>
//                 <Form.Item
//                   label="Notification Text"
//                 >
//                   <TextArea rows={4} value={indiNoti?.description} style={{ color: 'black' }} disabled={isDisabled}/>
//                 </Form.Item>
//               </div>
//               <div className='grid grid-cols-2 gap-5'>
//                 <Form.Item
//                   label="Date"
//                 >
//                   <DatePicker value={indiNoti?.date} onChange={onDateChange}  className='p-2 w-full'  style={{ color: 'black' }} inputReadOnly={true} disabled={isDisabled}/>
//                 </Form.Item>
//                 <Form.Item
//                   label="Time"
//                 >
//                   <TimePicker value={indiNoti?.time} format={'HH:mm'} className='p-2 w-full' inputReadOnly={true}  disabled={isDisabled}/>
//                 </Form.Item>
//               </div>
//               <div className='flex gap-5 justify-end'>
//                 <Button disabled={isDisabled}>Cancel</Button>
//                 <Button disabled={isDisabled} onClick={patchNotification} htmlType="submit" className='bg-[#2967ff] text-white border-none'>Save Changes</Button>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </Card>
//     </>
//   )
// }
// export default function IndividualNotificationDetails() {
//   const navigate = useNavigate();
//   const [indiNoti, setIndiNoti] = useState<notification | undefined>(); // Initialize as undefined to signify no data yet
//   const [isDisabled, setIsDisabled] = useState<boolean>(false);
//   const [formData, setFormData] = useState<Partial<notification>>({}); // State to store form data

//   const { id } = useParams();

//   const fetchNotification = async () => {
//     try {
//       const response = await http.get(`api/v1/notifications/${id}`);
//       toast.success(response.data.message);
//       setIndiNoti(response.data.data);
//       response.data.data.notification_status === "published"
//         ? setIsDisabled(true)
//         : setIsDisabled(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(setNotificationPage('SubNotification'));
//     fetchNotification();
//   }, [dispatch, id]); // Include id in the dependencies array

//   const handleInputChange = (key: keyof notification, value: string) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [key]: value,
//     }));
//   };

//   const patchNotification = async () => {
//     try {
//       const response = await http.patch(`/api/v1/notifications/${id}`, formData); // Use formData as payload
//       toast.success(response.data.message);
//       console.log(response);
//     } catch (err) {
//       console.error("notification cannot be updated", err);
//     } finally {
//       navigate("/notifications");
//     }
//   };

//   return (
//     <>
//       <Card>
//         <div>
//           <div className="flex flex-col mb-3">
//             <p>Notification Image</p>
//             <Image width={100} height={100} src="error" />
//           </div>

//           <div>
//             <Form layout="vertical">
//               <div className="grid grid-cols-2 gap-5">
//                 <Form.Item label="Notification Title">
//                   <Input
//                     className="p-2"
//                     value={indiNoti?.title}
//                     onChange={(e) =>
//                       handleInputChange("title", e.target.value)
//                     }
//                     style={{ color: "black" }}
//                     disabled={isDisabled}
//                   />
//                 </Form.Item>
//                 <Form.Item label="Status">
//                   <Input
//                     className="p-2"
//                     value={indiNoti?.notification_status}
//                     style={{ color: "black" }}
//                     disabled={isDisabled}
//                   />
//                 </Form.Item>
//               </div>
//               <div>
//                 <Form.Item label="Notification Text">
//                   <TextArea
//                     rows={4}
//                     value={indiNoti?.description}
//                     style={{ color: "black" }}
//                     disabled={isDisabled}
//                   />
//                 </Form.Item>
//               </div>
//               <div className="grid grid-cols-2 gap-5">
//                 <Form.Item label="Date">
//                   <DatePicker
//                     value={indiNoti?.date}
//                     onChange={onDateChange}
//                     className="p-2 w-full"
//                     style={{ color: "black" }}
//                     inputReadOnly={true}
//                     disabled={isDisabled}
//                   />
//                 </Form.Item>
//                 <Form.Item label="Time">
//                   <TimePicker
//                     value={indiNoti?.time}
//                     format={"HH:mm"}
//                     className="p-2 w-full"
//                     inputReadOnly={true}
//                     disabled={isDisabled}
//                   />
//                 </Form.Item>
//               </div>
//               <div className="flex gap-5 justify-end">
//                 <Button disabled={isDisabled}>Cancel</Button>
//                 <Button
//                   disabled={isDisabled}
//                   onClick={patchNotification}
//                   htmlType="submit"
//                   className="bg-[#2967ff] text-white border-none"
//                 >
//                   Save Changes
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </Card>
//     </>
//   );
// }
export default function IndividualNotificationDetails() {
  const navigate = useNavigate();
  const [indiNoti, setIndiNoti] = useState<notification>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(""); 
  const [description, setDescription] = useState<string>(""); 
  const [date, setDate] = useState<string>(""); 
  const [time, setTime] = useState<string>(""); 
  const [status, setStatus] = useState<string>("");

  const { id } = useParams();

  const fetchNotification = async () => {
    try {
      const response = await http.get(`api/v1/notifications/${id}`);
      toast.success(response.data.message);
      const dateTime = response.data.data.scheduled_at.split(" ")[4];
      setTime(dateTime)
      const data = response.data.data;
      setIndiNoti(data);
      setTitle(data.title || ""); 
      setDescription(data.description || ""); 
      setDate(data.date || ""); 
      setTime(data.time || ""); 
      setStatus(data.notification_status || "")
      response.data.data.notification_status === "published"
        ? setIsDisabled(true)
        : setIsDisabled(false);
    } catch (err) {
      console.error(err);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNotificationPage('SubNotification'));
    fetchNotification();
  }, [dispatch, id]);

  const patchNotification = async () => {
    try {
      const payload = {
        title,
        description,
        date,
        time,
      };
      const response = await http.patch(`/api/v1/notifications/${id}`, payload);
      toast.success(response.data.message);
      console.log(response);
    } catch (err) {
      console.error("notification cannot be updated", err);
    } finally {
      navigate('/notifications')
    }
  };

  return (
    <>
      <Card>
        <div>
          <div className='flex flex-col mb-3'>
            <p>Notification Image</p>
            <Image
              width={100}
              height={100}
              src="error"
              fallback="data:image/png;base64,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"
            />
          </div>

          <div>
            <Form layout="vertical">
              <div className='grid grid-cols-2 gap-5'>
                <Form.Item label="Notification Title">
                  <Input
                    className='p-2'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ color: 'black' }}
                    disabled={isDisabled}
                  />
                </Form.Item>
                <Form.Item label="Status">
                  <Select value={status} onChange={(value) => setStatus(value)} disabled={isDisabled}>
                    <Select.Option value="0">Scheduled</Select.Option>
                    <Select.Option value="1">Cancelled</Select.Option>
                    <Select.Option value="2">Draft</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item label="Notification Text">
                  <TextArea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ color: 'black' }}
                    disabled={isDisabled}
                  />
                </Form.Item>
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <Form.Item label="Date">
                  <DatePicker
                    value={date ? moment(date, 'YYYY-MM-DD') : null}
                    onChange={(date, dateString) => setDate(dateString)}
                    className='p-2 w-full'
                    style={{ color: 'black' }}
                    inputReadOnly={true}
                    disabled={isDisabled}
                  />
                </Form.Item>
                <Form.Item label="Time">
                  <TimePicker
                    value={time ? moment(time, 'HH:mm') : null}
                    // value={time}
                    format={'HH:mm'}
                    className='p-2 w-full'
                    inputReadOnly={true}
                    disabled={isDisabled}
                    onChange={(time, timeString) => setTime(timeString)}
                  />
                </Form.Item>
              </div>
              <div className='flex gap-5 justify-end'>
                <Button onClick={()=>navigate('/notifications')}>Cancel</Button>
                <Button disabled={isDisabled} onClick={patchNotification} htmlType="submit" className='bg-[#2967ff] text-white border-none'>Save Changes</Button>
              </div>
            </Form>
          </div>
        </div>
      </Card>
    </>
  );
}
