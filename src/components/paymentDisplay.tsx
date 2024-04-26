import { useCallback, useEffect, useState } from 'react';
import http from '../http/http';
import { Card, Flex, Spin, Table } from 'antd';
import { PAYMENTINFOMATION_DATA_COL } from '../assets/constant/payment';
import { PaymentInformation } from '../assets/dto/data.type';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';


function PaymentDisplay() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInformation[]>([]);

 const handleError = (error: Error) => {
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
 };
    // api calling section
  const fetchData = useCallback(
      async (page: number) => {
          setLoading(true);
          try {
              const skip = (page - 1) * 10;
              const response = await http.get(`/api/v1/payments?limit=10&offset=${skip}`);
              console.log(currentPage);
              // console.log(response.data.data);
              setPaymentInfo(response.data.data);
              // console.log(total);
              setCurrentPage(page);
            toast.success(response.data.message)
              setTotal(response.data.total);
              setLoading(false);
          } catch (error) {
              handleError(error as Error);
          } finally {
              setLoading(false);
          }
      },
      [currentPage]
  );

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    return (
        <>
            <div className="w-full">
                <>
                    {loading ? (
                        <Flex gap="middle" className="w-full h-full justify-center ">
                            <Spin size="large" />
                        </Flex>
                    ) : (
                        <>
                            <Card title="Categories page" className="m-2">
                                <Table
                                    rowClassName="text-center"
                                    dataSource={paymentInfo}
                                    pagination={{
                                        pageSize: 10,
                                        total: total,
                                        current: currentPage,
                                        onChange: (page) => {
                                            fetchData(page);
                                        },
                                    }}
                                    // pagination={false}
                                    columns={PAYMENTINFOMATION_DATA_COL(currentPage, 10)}
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
                            </Card>
                        </>
                    )}
                </>
            </div>
        </>
    );
}

export default PaymentDisplay;
