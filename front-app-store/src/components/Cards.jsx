import React, { useState, useEffect, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { baseUrl } from "../enveronment.js";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Card from "./Card.jsx";
import "./styles.scss";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const Cards = ({ categories }) => {
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
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 2000,
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
				const categoryParam = categories.join(",");
				let url = `${baseUrl}products-by-categories?categories=${categoryParam}`;
				const response = await axios.get(url);
				if (response.status === 200) {
					const contentType = response.headers["content-type"];
					if (contentType && contentType.includes("application/json")) {
						const data = response.data;
						setProducts(data);
					} else {
						console.error("Response content type is not JSON");
					}
				} else {
					console.error("Request failed with status:", response.status);
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};
		fetchProducts();
	}, [categories]);


	return (
		<div className="cards">
			<div className="cardItems">
				<Box display="flex" flexDirection="row" alignItems="center">
					<Box display="flex" flexDirection="row" alignItems="center" marginRight={2}>
						<IconButton className="arrowIcons" onClick={handlePrevClick}>
							<ArrowBackIosNewOutlinedIcon style={{ fontSize: 'small' }} />
						</IconButton>
						<IconButton className="arrowIcons" onClick={handleNextClick}>
							<ArrowForwardIosOutlinedIcon style={{ fontSize: 'small' }} />
						</IconButton>
					</Box>
					<Box flexGrow={8}>
						<Typography variant="h6" style={headerStyle}>
							عروض المركز| الأجهزة الحديثة
						</Typography>
					</Box>
				</Box>
				<div className="items">
					<Slider ref={sliderRef} {...settings}>
						{products.map((product, index) => (
							<Link
								className="Linkstyle"
								key={index}
								to={`/product/${product._id}`}
							>
								<Card
									image={product.imageUrl}
									title={product.name}
									description={product.description}
									price={product.price}
									beforePrice={product.beforePrice}
									id={product._id}
								/>
							</Link>
						))}
					</Slider>
				</div>
			</div>
		</div>
	);
};

export default Cards;
