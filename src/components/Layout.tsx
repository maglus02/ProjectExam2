import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <>
            <Header className={isHomePage ? 'header-overlay' : ''} />
            <main className={`container-fluid ${isHomePage ? 'home-page-main' : ''}`}>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
