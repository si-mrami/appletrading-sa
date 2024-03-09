import React from 'react';
import Header from '../components/Header';
import "../styles/Immediatemobilemaintenance.css";
import Footer from '../components/Footer';



const Immediatemobilemaintenance = () => {


  return (
    <div>
      <Header />
      <div >
        <div  className='maintenance'>
          <p>
            الي منزل العميل : لدينا فريق متخصص بالصيانه للاجهزة الإلكترونية الحديثه والنقاله والهواتف الحديثه المتطورة متوفره على مدار 24 ساعه على مدار الاسبوع عدا يوم السبت والجمعه. متجر ماي ستور
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Immediatemobilemaintenance;
