import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import { baseUrl } from '../enveronment.js';
import translations from '../components/translations.js';
import axios from 'axios';
import "./pageStyles.scss";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';


const Products = ({ category }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let url = `${baseUrl}products-by-category/${category}`;
		axios.get(url)
			.then((response) => {
				setProducts(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error(`Failed to fetch ${category} data:`, error);
				setLoading(false);
			});
	}, [category]);


	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<CircularProgress style={{ color: 'red' }} />
			</div>
		);
	}

	return (
		<div>
			<Header />
			<div className='iphone15-title'>{translations[category]}</div>
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

export default Products;
