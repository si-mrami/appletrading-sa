import React, { useState, useEffect, useRef } from 'react';
import '../styles/Cards.css';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { baseUrl } from '../enveronment.js';
import translations from './translations.js';
import './styles.scss';
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import IphonsCard from './IphonsCard.jsx';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const ProductsCarousel = ({ category }) => {
	const [products, setProducts] = useState([]);
	const sliderRef = useRef(null);

	const handlePrevClick = () => {
		if (sliderRef.current) {
			sliderRef.current.slickPrev();
		}
	};

	const handleNextClick = () => {
		if (sliderRef.current) {
			sliderRef.current.slickNext();
		}
	};

	const settings = {
		slidesToShow: 2,
		slidesToScroll: 1,
		infinite: true,
		speed: 600,
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
				},
			},
		],
	};


	const headerStyle = {
		backgroundColor: '#333',
		color: '#fff',
		padding: '10px',
		margin: '10px',
		transition: 'color 0.7s',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'Lobster, cursive',
		height: '60px',
		borderRadius: '8px',
	};


	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const url = `${baseUrl}products-by-category/${category}`;
				const response = await axios.get(url);
				setProducts(response.data);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};
		fetchProducts();
	}, [category]);

	return (
		<div className='cards'>
			<Box display="flex" flexDirection="row" alignItems="center">
				<Box>
					<Link to={category === "iphone14" ? `/${category}` : "/iphones15"}>
						<Button href={`#${category}`} variant="outlined" style={{ color: 'black', backgroundColor: 'white' ,borderColor: '#8b8181' }}>
							عرض الكل
						</Button>
					</Link>
				</Box>
				<Box display="flex" flexDirection="row" alignItems="center" marginRight={2}>
					<IconButton className="arrowIcons" onClick={handlePrevClick}>
						<ArrowBackIosNewOutlinedIcon style={{fontSize:'small'}}/>
					</IconButton>
					<IconButton className="arrowIcons" onClick={handleNextClick}>
						<ArrowForwardIosOutlinedIcon style={{fontSize:'small'}}/>
					</IconButton>
				</Box>
				<Box flexGrow={8}>
					<Typography variant="h6" style={headerStyle}>
						{translations[category]}
					</Typography>
				</Box>
			</Box>
			<Slider ref={sliderRef} {...settings}>
				{products.map((product) => (
					<div key={product.id} style={{ display: 'flex', justifyContent: 'center' }}>
						<Link className="Linkstyle" to={`/product/${product._id}`}>
							<IphonsCard
								image={product.imageUrl}
								title={product.name}
								description={product.description}
								price={product.price}
								beforePrice={product.beforePrice}
								id={product._id}
							/>
						</Link>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default ProductsCarousel;
