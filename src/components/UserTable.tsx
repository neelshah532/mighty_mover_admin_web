import { Empty, Card, Table } from 'antd';
import { USER_DATA_COL, USER_TABLE } from '../assets/constant/constant';
import { User } from '../assets/dto/data.type';
import { ColumnProps } from 'antd/es/table';

export default function UserPage() {
    const data: User[] = USER_TABLE;
    const columns: ColumnProps<User>[] = USER_DATA_COL;


    return (
        <div>
            <div>
                {columns.length === 0 ? (
                    <Empty />
                ) : (
                    <>
                        
                        <Card title="User" className="m-2 random:w-1/2">
                            <Table
                                dataSource={data}
                                pagination={{ pageSize: 4 }}
                                columns={columns}
                                bordered
                                sticky
                                className="w-full"
                            ></Table>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
}
