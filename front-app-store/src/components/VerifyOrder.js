import React from 'react';
import Sectionfooter from '../components/Sectionfooter';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import './styles.scss';


const verifyOrderStyles = {

  backgroundColor: '#D1461F',
  width: '90%',
  maxWidth: '500px',
  height: '30px',
  borderRadius: '30px',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  fontSize: '22px',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '20px',
  marginTop:'15px',
};

const madaLogo = {
  width: '40px',
  height: 'auto',
  display: 'inline-block',
  margin: '5px',
};

const visaLogo = {
  width: '40px',
  height: 'auto',
  display: 'inline-block',
  margin: '5px',
};

const MasterCardLogo = {
  width: '40px',
  height: 'auto',
  display: 'inline-block',
  margin: '5px',
};

const ApplePay = {
  width: '40px',
  height: 'auto',
  display: 'inline-block',
  margin: '5px',
};




const VerifyOrder = () => {

  const { orderId } = useParams();
  const navigate = useNavigate();

  const { state } = useLocation();
  const isComingFromCorrectRoute = state && state.fromOrderConfirmation;

  if (!isComingFromCorrectRoute) {
    navigate('/الرئيسية');
    return null;
  }

//   console.log('Received state:', state);



// console.log('Received state:', state);


  return (
    <div className='orderConf'>
      <Header />
      <div style={verifyOrderStyles}>تدقيق الطلب</div>
      <div
        style={{
          backgroundColor: '#bbf0bb',
          border: 'solid 1px #ccc',
          color: '#184701',
          height: '65px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10px',
          width: '90%',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <span>...جاري التحقق من الطلب </span>
      </div>
      <div className='ordertag'
        style={{
          border: 'solid 1px #ccc',
          color: 'black',
          height: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10px',
          width: '90%',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
          <a className='tagggg' href="mailto:maystwr9@gmail.com">
        <div className='tawasol'
          style={{
            backgroundColor: '#D1461F',
            color: 'white',
            marginTop: 'auto',
            height: '35px',
            width: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          التواصل مع مديرة المبيعات لاتمام الطلب
        </div>
        </a>
      </div>
      <div style={{ border: '1px solid #ccc', margin: '4px', width: '100%' }}></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '10px',
        }}
      >
        <div style={{ whiteSpace: 'nowrap', width: '90%', textAlign: 'center' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Mada_Logo.svg"
            alt="مدى Mada Logo"
            className="madaLogo"
            style={madaLogo}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Old_Visa_Logo.svg"
            alt="visa Logo"
            className="visaLogo"
            style={visaLogo}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/48/MasterCard-Logo.svg"
            alt="MasterCard Logo"
            className="MasterCardLogo"
            style={MasterCardLogo}
          />
          <img
            src="https://iconape.com/wp-content/uploads/1/12/Apple-Pay-Logo-0%D9%A3.png"
            alt="ApplePay"
            className="ApplePay"
            style={ApplePay}
          />
        </div>
      </div>
      <div style={{ border: '1px solid #ccc', margin: '4px', width: '100%' }}></div>
      <Sectionfooter className="sectionfooter" style={{ textAlign: 'center' }} />
    </div>
  );
};

export default VerifyOrder;
