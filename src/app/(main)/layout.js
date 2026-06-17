import Footer from '@/components/Footer';
import Navbar from '@/components/navbar/Navbar';
import React from 'react';

const MainLayout = ({children}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
