import React from 'react';
import { HashLoader } from 'react-spinners';

const loading = () => {
    return (
        <div className='container mx-auto max-h-200'>
            <HashLoader className='mx-auto flex items-center'/>
        </div>
    );
};

export default loading;

