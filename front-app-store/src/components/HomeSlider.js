import React from 'react';
import Carousel from 'react-material-ui-carousel';
import slide1 from '../Assets/slide1.jpeg';
import slide2 from '../Assets/slide2.jpeg';
import slide3 from '../Assets/slide3.jpeg';
import "../styles/HomeSlider.css";
import { Link } from 'react-router-dom';

const CustomCarousel = ({ items, ...props }) => {
  return (
    <div className="custom-carousel" style={{marginTop:'0'}}>
      <Carousel {...props}>{items}</Carousel>
    </div>
  );
};

export default function HomeSlider() {
  const carouselSettings = {
    animation: 'fade',
    timeout: 300,
    navButtonsAlwaysVisible: true,
    navButtonsAlwaysInvisible: true,
  };

  const slides = [
     <Link style={{textDecoration: 'none', marginTop:'0'}} to= {`/Playstations`} key={1} className="carousel-container">
      <img src={slide1} alt="Slide 1" />
    </Link>,
      <Link style={{textDecoration: 'none',marginTop:'0'}} to= {`/iphones15`}  key={2} className="carousel-container">
      <img src={slide2} alt="Slide 2" />
      </Link> ,
       <Link style={{textDecoration: 'none', marginTop:'0'}} to={`/iphones15`}  key={3} className="carousel-container">
      <img src={slide3} alt="Slide 3" />
 </Link> ,
  ];

  return <CustomCarousel style={{marginTop:'0'}} items={slides} {...carouselSettings} />;
}
