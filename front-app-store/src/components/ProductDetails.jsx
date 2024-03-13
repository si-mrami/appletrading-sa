import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "./Breadcrumbs.js";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import StickyButton from "./StickyButton.js";
import OrderForm from "./OrderForm.js";
import ReviewForm from "./ReviewForm.jsx";
import "../styles/ProductDetails.scss";
import ReviewsPage from './ReviewsPage';
import axios from 'axios';
import { baseUrl } from '../enveronment.js';
import Carousel from 'react-bootstrap/Carousel';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import Sectionfooter from "./Sectionfooter.jsx";
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const mobileQuantityStyle = {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	border: "1px solid #ccc",
	borderRadius: "4px",
	padding: "4px",
};

const quantityBlockStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	border: "1px solid #ccc",
	borderRadius: "4px",
	padding: "8px",
};

const buttonStyle = {
	color: "black",
	padding: "8px 16px",
	border: "none",
	cursor: "pointer",
	fontSize: "18px",
};

const ProductDetails = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState(null);
	const [showOrderForm, setShowOrderForm] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [quantityStyle, setQuantityStyle] = useState(
		window.innerWidth <= 768 ? mobileQuantityStyle : quantityBlockStyle
	);
	const [submittedReviews, setSubmittedReviews] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [allImages, setAllImages] = useState([]);
	const [image, setImage] = useState(allImages.length > 0 ? allImages[0] : null);
	const [expandedDescription, setExpandedDescription] = useState(false);
	const [showdesc, setShowdesc] = useState(true);

	const onshowdesc = () => {
		setShowdesc(!showdesc);
	}

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				let url = `${baseUrl}products/${productId}`;
				const response = await axios.get(url);
				if (response.status === 200) {
					const data = response.data;
					console.log(data);
					setProduct(data);
				} else {
					console.error("Request failed with status:", response.status);
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchProduct();
	}, [productId]);

	useEffect(() => {
		const fetchProductImages = async () => {
			try {
				let url = `${baseUrl}product-images/${productId}`;
				const response = await axios.get(url);
				if (response.status === 200) {
					const data = response.data;
					setAllImages(data);
				} else {
					console.error("Request failed with status:", response.status);
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		if (productId) {
			fetchProductImages();
		}
	}, [productId]);

	useEffect(() => {
		if (allImages.length > 0) {
			setImage(allImages[0]);
		}
	}, [allImages]);

	useEffect(() => {
		const handleResize = () => {
			const isMobile = window.innerWidth <= 768;
			if (isMobile) {
				setQuantityStyle(mobileQuantityStyle);
			} else {
				setQuantityStyle(quantityBlockStyle);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleReviewSubmit = (newReview) => {
		newReview.productId = productId;
		setSubmittedReviews([...submittedReviews, newReview]);
		let reviewurl = `${baseUrl}submit-review`;

		axios.post(reviewurl, newReview, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.status === 200) {
					let fetchreviewurl = `${baseUrl}reviews/${productId}`;
					axios.get(fetchreviewurl)
						.then((response) => {
							setReviews(response.data);
						})
						.catch((error) => {
							console.error("Failed to fetch reviews:", error);
						});
				} else {
					console.error("Review submission failed");
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	const toggleOrderForm = () => {
		setShowOrderForm(!showOrderForm);
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const increaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const expandDescription = () => {
		setExpandedDescription(true);
	};

	const breadcrumbItems = [
		{ label: "الصفحة الرئيسية", url: "../الرئيسية" },
	];

	if (!product) {
		return (
			<div style={{ backgroundColor: "#F2F2F2" }}>
				<Header />
				<Breadcrumb items={breadcrumbItems} />
			</div>
		);
	}

	const jsonString = product.hashtags;
	const hashtagsArray = JSON.parse(jsonString);
	const formattedHashtags = hashtagsArray.map(hashtag => hashtag);

	return (
		<div className="productDet" style={{ backgroundColor: "#F2F2F2", overflowY: "auto" }}>
			<Header />
			<div style={{ overflowY: "auto" }}>
				{showOrderForm && (
					<OrderForm toggleOrderForm={toggleOrderForm} product={product} quantity={quantity} image={image} />
				)}
			</div>
			<Breadcrumb items={breadcrumbItems} />
			<div className="productInfo">
				<div className="left">
					<div className="productName">
						<h3>
							{product.name}
						</h3>
						<KeyboardArrowLeftOutlinedIcon style={{ fontSize: '15px' }} />
					</div>
					<div className="productTitle">
						<h3>
							{product.name}
						</h3>
					</div>

					<div className="prices">
						<span>{product.price}</span>
						<span className="p">{product.beforePrice}</span>
					</div>
				</div>
				<div className="right">
					<Carousel data-bs-theme="dark">
						{allImages.map((image, index) => (
							<Carousel.Item key={index}>
								<img
									className="d-block w-100"
									src={image.imageUrl}
									alt="First slide"
								/>
							</Carousel.Item>
						))}
					</Carousel>
				</div>
			</div>
			<div className="hashtagg">
				<h2 style={{ fontSize: "24px", textAlign: "right" }}>:الوسوم</h2>
				<ul className="listHashtag">
					{
						product.hashtags.map((hashtag, index) => (
							formattedHashtags.map((hashta) => (
								<li key={index}>
									<Link to={`/products-by-hashtags/${hashtag}`}>
										<span>{hashta}</span>
										<SellOutlinedIcon style={{ fontSize: '12px' }} />
									</Link>
								</li>
							))
						))
					}
				</ul>
			</div>
			<div id="quantity-block" style={quantityStyle}>
				<div
					style={{
						border: "1px solid black",
						padding: "1px",
						borderRadius: "4px",
					}}
				>
					<button onClick={decreaseQuantity} style={buttonStyle}>
						<div
							style={{ borderRight: "1px solid black", paddingRight: "8px" }}
						>
							-
						</div>
					</button>
					<span style={{ fontSize: "24px" }}>{quantity}</span>
					<button onClick={increaseQuantity} style={buttonStyle}>
						<div style={{ borderLeft: "1px solid black", paddingLeft: "8px" }}>
							+
						</div>
					</button>
				</div>
				<h2 style={{ fontSize: "24px", textAlign: "right" }}>:الكمية</h2>
			</div>

			<div style={{ fontSize: "24px", textAlign: "center" }}>
				<button
					onClick={toggleOrderForm}
					style={{
						...buttonStyle,
						backgroundColor: "red",
						color: "white",
						width: "200px",
						borderRadius: "5px",
					}}
				>  اطلب الان</button>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div style={{ flex: 1 }}>
					<h1
						style={{
							fontSize: "24px",
							color: "red",
							textAlign: "left",
							marginLeft: "20px",
						}}
					>
						{product.price}
					</h1>
					<div>
						<p style={{ textAlign: "left", marginLeft: "20px" }}>
							<span style={{ color: "grey", textDecoration: "line-through" }}>
								{product.beforePrice}
							</span>
						</p>
					</div>
				</div>
				<p
					style={{
						display: "inline",
						paddingLeft: "15px",
						fontSize: "24px",
						textAlign: "right",
					}}
				>
					{" "}
					:السعر
				</p>
			</div>

			<div className="desc" style={{ textAlign: "center", marginTop: "40px" }}>
				<div className="item" onClick={onshowdesc}>
					<ContactSupportIcon />
					<span>تفاصيل المنتج</span>
				</div>
				{!showdesc && (
					<p>{expandedDescription ? product.description : product.description.split('\n')[0]}</p>
				)}
				{!expandedDescription && !showdesc && (
					<a href="#expand-description" onClick={expandDescription} style={{ ...buttonStyle, color: "blue" }}>
						عرض المزيد
					</a>
				)}
			</div>

			<ReviewsPage productId={productId} />
			<ReviewForm onSubmit={handleReviewSubmit} productId={productId} />
			{!showOrderForm && window.innerWidth <= 768 && (
				<StickyButton productId={productId} toggleOrderForm={toggleOrderForm} />
			)}
			<Sectionfooter className="sectionfooter" style={{ textAlign: "center" }} />
		</div>
	);
};

export default ProductDetails;
