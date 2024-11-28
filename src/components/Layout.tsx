import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
    /** 
     * The children elements to be rendered inside the layout.
     */
    children: React.ReactNode;
}

/**
 * Layout component that wraps the application with a header, footer, and main content area.
 * Adjusts the styling of the header and main content based on the current route.
 * 
 * @param {LayoutProps} props - The props for the Layout component.
 * @param {React.ReactNode} props.children - The children elements to render inside the layout.
 * @returns {JSX.Element} The rendered Layout component.
 */
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
