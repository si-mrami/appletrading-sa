import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import "../styles/productByHashtags.css";
import CircularProgress from "@mui/material/CircularProgress";
import { baseUrl } from '../enveronment.js';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import './pageStyles.scss';


const ProductByHashtags = () => {
	const { hashtag } = useParams();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProductsByHashtag = async () => {
			try {
				const encodedHashtag = encodeURIComponent(hashtag);
				let url = `${baseUrl}products-by-hashtags/${encodedHashtag}`
				const response = await fetch(url)
				if (!response.ok) {
					throw new Error(`Request failed with status: ${response.status}`);
				}

				const data = await response.json();
				setProducts(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProductsByHashtag();
	}, [hashtag]);

	if (loading) {
		return (
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
				<CircularProgress style={{ color: "red" }} />
			</div>
		);
	}

	if (error) {
		return (
			<div>
				<Header />
				<p>Error: {error}</p>
			</div>
		);
	}


	const jsonString = hashtag;

	const hashtagsArray = JSON.parse(jsonString);
	const formattedHashtags = hashtagsArray.map(hashtag => hashtag);

	return (
		<div>
			<Header />
			<div className="iphone15-title">
				المنتجات بواسطة الهاشتاج: {formattedHashtags}
			</div>
			<div className="elements">
				{products.map((item) => (
					<div className="element" key={item._id}>
						<div className="Top">
							<img src={item.imageUrl} alt="" />
						</div>
						<div className="Bottom">
							<div className="title">
								<span>{item.name}</span>
							</div>
							<div className="prices">
								<div className="pricebefore">
									<span>{item.beforePrice}</span>
								</div>
								<div className="price">
									<span>{item.price}</span>
								</div>
							</div>
							<div className="lastelement">
								<Link to={`/product/${item._id}`}>
									<button>أطلب ألان</button>
								</Link>
								<Link to={`/product/${item._id}`}>
									<div className="iconsCard">
										<AddShoppingCartOutlinedIcon style={{ fontSize: '14px', color: '#111' }} />
									</div>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductByHashtags;
