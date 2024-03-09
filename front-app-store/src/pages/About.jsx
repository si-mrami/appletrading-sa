import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  const textStyle = {
    fontSize: "1.5rem",
    textAlign: "center",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  };

  return (
    <div>
      <Header />
      <div style={containerStyle}>
        <p style={textStyle}>
          توفر الأجهزة الإلكترونية العديد من الأجهزة الذكية والإكسسوارات والشحن
          الإلكتروني. يقدم مـاي سـتور تجربةـة تسـوق فريدة وسهلة تلبـي رغبةــة
          عمـلاء فــي المملكــة العربية السعودية. بأسعار وعروض منافسة معززة
          للعملاء فقط وسرعة توصيل مميزة. جميع منتجاتــات ماي ستور الأصلية
          مــتوفر أمكانية الاسترجاع او الاستبدال. هدفنا: إعادة تشكيل قطاع
          التجزئة الجزئي تجربة فريدة ومرضية رائعة. مهمتنا: تسهيل التواصل مع
          الاقتصاد الرقمي المزدهر من خلال حلول التجارة الإلكترونية المتنوعة
          لإثراء فوائدنا. مطلوب موظفين مبيعات مؤهلين كهربائيين مؤهلين للانضمام
          إلى أكثر من 100 مدينة في المملكة العربية السعودية. رؤيتنا: إلى عالم
          الوصول لتسليط الضوء على قطاع تجزئة ومميزة وتمكين. الوصول الى تجربة
          رقمية مميزة لعملاءنا.
        </p>
      </div>
      <Footer/>
    </div>
  );
};

export default About;
