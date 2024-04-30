import { ColumnProps } from "antd/es/table";
import { AlignType,  role_data } from "../dto/data.type";

export const ROLE_DATA_COL: ColumnProps<role_data>[] = [
    {
        title: 'Index',
        dataIndex: 'id',
        render: (_, __, index) => index + 1,
        align: 'center' as AlignType,
    },
    {
        title: 'Role Name',
        dataIndex: 'name',
        align: 'center' as AlignType,
        
    },
    {
        title: 'Description',
        dataIndex: 'description',
        align: 'center' as AlignType,
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        align: 'center' as AlignType,
        render:(created_at:string)=>{
            return(
                <>
                <div>
                    {created_at.substring(0,10)}
                </div>
                </>
            )
        }
    },
  
];
