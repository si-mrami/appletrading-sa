import React from 'react';
import '../styles/Footer.css';





const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="footer">
            &copy; {currentYear}
            <p>  مؤسسة أبل التجارية لجميع منتجات الهواتف الذكية والألعاب سوني</p>
        </div>
    );
}

export default Footer;
