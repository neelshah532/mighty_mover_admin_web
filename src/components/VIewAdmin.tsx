import {  Card, Flex,  Spin, Table } from 'antd';
import  { useCallback, useEffect, useState } from 'react';
// import { ADD_ITEM, CANCEL, DELETE, DELETE_CONFIRMATION, EDIT_ITEM } from '../assets/constant/model';
import { ADMIN_COL } from '../assets/constant/adminDisplay';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import http from '../http/http';
import { useDispatch } from 'react-redux';
import { AdminsDisplay } from '../assets/dto/data.type';
import { setPage } from '../redux/pageSlice';

function VIewAdmin() {
  const [loading, setLoading] = useState(false);
   const [adminData, setAdminData] = useState<AdminsDisplay[]>([]);
    const dispatch = useDispatch();

       const fetchData = useCallback(async () => {
           setLoading(true);
           try {
               const response = await http.get(`/api/v1/admin`);
              //  console.log(currentPage);
               // console.log(response.data.data);
               setAdminData(response.data.data);
               // console.log(total);
               
               setLoading(false);
           } catch (error) {
               if (axios.isAxiosError(error)) {
                   const axiosError = error as AxiosError<{
                       status: number;
                       message: string;
                   }>;
                   if (axiosError.response) {
                       console.log('Response Error', axiosError.response);
                       toast.error(axiosError.response.data.message);
                   } else if (axiosError.request) {
                       console.log('Request Error', axiosError.request);
                   } else {
                       console.log('Error', axiosError.message);
                   }
               }
           } finally {
               setLoading(false);
           }
       }, []);
  useEffect(() => {
      dispatch(setPage('Admin'));
      void fetchData();
  }, [dispatch, fetchData]);

   return (
       <>
           <div>
               {/* {loading ? (
                    <Flex  gap="middle" className='w-full h-full justify-center '>
                        <Spin size="large" />
                    </Flex>
                ) : ( */}
               <>
                   <Card title="Categories page" className="m-2">
                       <div className="flex justify-end mb-2">
                           {/* <Button onClick={handleAdd} style={{ backgroundColor: '#2967ff' }}>
                                {ADD_ITEM}
                            </Button> */}
                       </div>
                       {loading ? (
                           <Flex gap="middle" className="w-full h-full justify-center ">
                               <Spin size="large" />
                           </Flex>
                       ) : (
                           <>
                               <Table
                                   rowClassName="text-center"
                                   dataSource={adminData}
                                   // pagination={{
                                   //     pageSize: 5,
                                   //     total: total,
                                   //     current: currentPage,
                                   //     onChange: (page) =>{
                                   //         setCurrentPage(page)
                                   //         fetchData();
                                   //     },
                                   // }}
                                   pagination={false}
                                  columns={ADMIN_COL()}
                                   // bordered
                                   sticky
                                   className="w-full"
                               ></Table>
                               {/* <Pagination
                                   current={currentPage}
                                   onChange={(page) => HandlePagination(page)}
                                   total={total}
                                   pageSize={10}
                               /> */}
                           </>
                       )}
                   </Card>
               </>
               {/* )} */}

               {/* <Modal
                   title="Confirm Deletion"
                   open={deleteModalVisible}
                   onCancel={handleDeleteModalCancel}
                   footer={
                       <div className="flex gap-3 justify-end">
                           <Button onClick={handleDeleteModalCancel}>{CANCEL}</Button>
                           <Button onClick={handleDeleteConfirm}>{DELETE}</Button>
                       </div>
                   }
               >
                   <p>{DELETE_CONFIRMATION}</p>
               </Modal> */}
           </div>
       </>
   );
}

export default VIewAdmin;
