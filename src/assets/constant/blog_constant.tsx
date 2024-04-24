import { ColumnProps } from 'antd/es/table';
import { AlignType, blog } from '../dto/data.type';
import comment1 from '../Images/icons/comment-alt-message.svg';
import heart from "../Images/icons/heart.svg"
export const BLOG_DATA = (currentPage: number, pageSize: number): ColumnProps<blog>[] => [
    {
        title: 'Index',
        dataIndex: 'id',
        render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,

        align: 'center' as AlignType,
        width: '70px',
    },
    {
        title: 'Image',
        dataIndex: 'document',
        render: (document: any) => {
            return (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img src={document} alt="image" style={{ width: '70px', height: '50px' }}></img>
                </div>
            );
        },
        align: 'center' as AlignType,
        width: '100px',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        align: 'center' as AlignType,
    },
    {
        title: 'Author',
        dataIndex: 'author_name',
        align: 'center' as AlignType,
    },
    {
        title: 'Like',
        dataIndex: 'like',
        render: (like) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <div>
                        <img src={heart} alt="comment" style={{ height: '15px', width: '15px' }}></img>
                    </div>
                    <div style={{ fontSize: '15px' }}>{like}</div>
                </div>
            );
        },
        align: 'center' as AlignType,
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
        render: (comment) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <div>
                        <img src={comment1} alt="comment" style={{ height: '15px', width: '15px' }}></img>
                    </div>
                    <div style={{ fontSize: '15px' }}>{comment}</div>
                </div>
            );
        },
        align: 'center' as AlignType,
    },
];
