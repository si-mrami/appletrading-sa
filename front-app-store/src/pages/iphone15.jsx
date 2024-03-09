import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { baseUrl } from '../enveronment.js';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Link } from 'react-router-dom';
import './pageStyles.scss';


const Iphone15 = ({ categories }) => {
	const [iphone, setIphone] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const categoryParam = categories.join(',');
				let url = `${baseUrl}products-by-categories?categories=${categoryParam}`;
				const response = await axios.get(url);
				if (response.status === 200) {
					setIphone(response.data);
					setLoading(false);
				} else {
					console.error('Request failed with status:', response.status);
					setLoading(false);
				}
			} catch (error) {
				console.error('Error:', error);
				setLoading(false);
			}
		};

		fetchProducts();
	}, [categories]);

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
			<div className="iphone15-title">آيفون 15</div>
			<div className="elements">
				{iphone.map((item) => (
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

export default Iphone15;
