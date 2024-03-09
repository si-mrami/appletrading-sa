import React, { useState , useEffect } from 'react';
import { FaTruckFast } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import './styles.scss'


const GreetingBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div style={{ backgroundColor: '#ff0000', color: '#fff', height: '40px', display: 'flex', alignItems: 'center', padding: '0 10px',fontSize:'20px' }}>
      <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={handleClose}>
      <IoCloseCircleOutline />
      </button>
      <div className='bannerStyle' style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' ,marginRight:'auto' }}>
        <span>اهلا و سهلا بك في مؤسسة ابل التجاريه
		</span>
        <FaTruckFast style={{ marginLeft: '5px' }} />
      </div>
    </div>
  ) : null;
};

export default GreetingBanner;
