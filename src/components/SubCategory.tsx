import React from 'react';
import { useParams } from 'react-router-dom';

const SubCategory = () => {
    const { id } = useParams();

    console.log(id);

    return <div>SubCategory</div>;
};

export default SubCategory;
