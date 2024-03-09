import React from 'react';
import Header from "../components/Header";
import "../styles/Fastdelivery.css";
import Footer from '../components/Footer';

const Fastdelivery = () => {
    return (
        <div>
            <Header />
            <div className="fastdelivery-content">
                <p>
                    الي العميل مع ضمان المنتجات من الموقع: لدينا أكثر من طريقة توصيل ومنها مناديب خاصة وتابعة للمتجر (ماي ستور) المتخصصة بالتوصيل لجميع المناطق والمدن بالمملكة العربية السعودية ومنها: شركة سمسا المتخصصة بالتوصيل لجميع المناطق والمدن بالمملكة العربية السعودية. ومنها: شركة ارامكس المتخصصة بالتوصيل لجميع المناطق والمدن بالمملكة العربية السعودية
                </p>
            </div>
            <Footer/>
        </div>
    );
}

export default Fastdelivery;
