import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import "../styles/PaymentPopup.css";


const PaymentPopup = ({ open, handleClose, period, monthlyInstallment }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`ادفع 1000 ر.س الان و قسط المبلغ المتبقي على ${period} شهر`}</DialogTitle>
        <DialogContent>
          <DialogTitle dir="rtl"> رسوم الدفع</DialogTitle>
          <DialogContentText dir="rtl">
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>شهر</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>الدفع</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: period }, (_, index) => (
                  <tr key={index + 1}>
                   <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{`الشهر ${index + 1}`}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{`قيمة الدفعة الشهرية ${monthlyInstallment} ر.س`}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </DialogContentText>
          <DialogTitle dir="rtl">طريقة الاستخدام</DialogTitle>
          <DialogContentText dir="rtl">
            <ol>
              <li><span className='number'>1</span>قم بتشغيل خيار التقسيط </li>
              <li><span className='number'>2</span>انتقال الى الصفحة الدفع وسدد قيمة الدفعة الأولى 1000</li>
              <li><span className='number'>3</span>سنرسل لك رسائل لتذكيرك بموعد استحقاق دفعتك القادمة</li>
            </ol>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button 
              onClick={handleClose} 
              color="primary"
              style={{
                background: '#000',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '40px',
                padding: '10px 20px',
                marginBottom: '10px',
              }}
            >
              تابع التسوق
            </Button>
            <div style={{ whiteSpace: 'nowrap', display: 'flex', justifyContent: 'center' }}>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Mada_Logo.svg"
      alt="مدى Mada Logo"
      className="mada-logo"
      style={{ margin: '5px' }}
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Old_Visa_Logo.svg"
      alt="visa Logo"
      className="visa-logo"
      style={{ margin: '5px' }}
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/4/48/MasterCard-Logo.svg"
      alt="MasterCard Logo"
      className="MasterCard-logo"
      style={{ margin: '5px' }}
    />
  </div>
</div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PaymentPopup;
