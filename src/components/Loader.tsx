import { Spin } from 'antd';

export default function Loader() {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-slate-100 bg-opacity-70 flex justify-center items-center z-50">
                <Spin size="large" />
            </div>
        </>
    );
}
