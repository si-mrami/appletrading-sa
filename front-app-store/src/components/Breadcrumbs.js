import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import './styles.scss'

const Breadcrumb = ({ items }) => {


  const listItemStyle = {
    marginRight: '20px',
  };

  const containerDirection = 'rtl';

  return (
    <nav style={{ display: 'flex', alignItems: 'center', direction: containerDirection }}>
      <ul className='breadcrumbStyle'>
         <div style={{ textAlign: 'right' }}>
        <HomeOutlinedIcon />
      </div>
        {items.map((item, index) => (
          <li key={index} style={listItemStyle}>
            <a href={item.url}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
