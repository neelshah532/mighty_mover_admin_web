import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setNotificationPage } from '../redux/notificationSlice';
import { Card, Image, Form, Input, DatePicker, Button } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';


import customParseFormat from 'dayjs/plugin/customParseFormat';
import http from '../http/http';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { notification } from '../assets/dto/data.type';
import { useNavigate } from 'react-router-dom';

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
  const [title, setTitle] = useState<string>(""); // State to hold title input value
  const [description, setDescription] = useState<string>(""); // State to hold description input value
  const [date, setDate] = useState<string>(""); // State to hold date input value
  const [time, setTime] = useState<string>(""); // State to hold time input value

  const { id } = useParams();

  const fetchNotification = async () => {
    try {
      const response = await http.get(`api/v1/notifications/${id}`);
      toast.success(response.data.message);
      const data = response.data.data;
      setIndiNoti(data);
      setTitle(data.title || ""); // Initialize title with notification's title, if available
      setDescription(data.description || ""); // Initialize description with notification's description, if available
      setDate(data.date || ""); // Initialize date with notification's date, if available
      setTime(data.time || ""); // Initialize time with notification's time, if available
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
                  <Input
                    className='p-2'
                    value={indiNoti?.notification_status}
                    style={{ color: 'black' }}
                    disabled={isDisabled}
                  />
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
