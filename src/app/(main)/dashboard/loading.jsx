import React from 'react';
import { HashLoader } from 'react-spinners';

const loading = () => {
    return (
        <div className='mx-auto max-h-10'>
            <HashLoader />
        </div>
    );
};

export default loading;

