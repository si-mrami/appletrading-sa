import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useShoppingCart } from "./ShoppingCartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Grid, Button } from '@material-ui/core';
import "../styles/shopping-cart-slide.css";
import { Link } from "react-router-dom";

const ShoppingCartSlide = ({ isOpen, onClose }) => {
	const { removeFromCart, calculateTotal, cartItems, updateQuantity } = useShoppingCart();

	useEffect(() => {
		// console.log('Cart items changed. Recalculating total.', calculateTotal);
	}, [cartItems]);

	const orderDetailsString = localStorage.getItem('orderDetails');
	const orderDetails = orderDetailsString ? JSON.parse(orderDetailsString) : null;

	return (
		<div className={`shopping-cart-slide ${isOpen ? "open" : ""}`}>
			<div className="shopping-cart-header">
				<IconButton onClick={onClose} style={{ backgroundColor: '#00CCC9', margin: "10px", borderRadius: '80px', padding: '10px' }}>
					<CloseIcon />
				</IconButton>
				<h3 className="header1">سلة الشراء</h3>
			</div>

			<div className="shopping-cart-items">
				{cartItems.map((item, index) => (
					<div key={index} className="cart-item">
						<div className="product-info">
							<div className="product-details">
								<div className="title-and-delete">
									<div className="image-container">
										<img src={item.imageUrl} alt={item.name} style={{ maxWidth: '60px' }} />
									</div>
									<span className="product-name" style={{ textAlign: 'right' }}>{item.name}</span>
									<div className="delete-button-container">
										<IconButton onClick={() => removeFromCart(item.id)}>
											<RiDeleteBin6Line style={{ color: '#B949E6' }} />
										</IconButton>
									</div>
								</div>
								<div className="quantity-container">
									<div>
										<button onClick={() => {
											if (item.quantity > 1) {
												updateQuantity(item.id, item.quantity - 1);
											}
										}} style={{ border: 'solid 1px #852C91', width: '20px', height: '20px', paddingBottom: '7px', color: '#852C91' }}>-</button>
										<span className="product-quantity" style={{ margin: '5px', fontWeight: 'bold' }}>{item.quantity}</span>
										<button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ border: 'solid 1px #852C91', width: '20px', height: '20px', paddingBottom: '7px', color: '#852C91' }}>+</button>
									</div>

									<p style={{ textAlign: 'right', fontSize: '15px' }} >         :الكمية</p>
								</div>
								
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<span className="product-price" style={{ color: '#00CCC9', textAlign: 'right', marginBottom: '5px', fontSize: '25px' }}>{item.price}</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="shopping-cart-footer">
				<h5 className="header2">ملخص الطلب </h5>
				<div style={{ border: '1px solid #ccc', marginTop: '4px', width: '100%', marginTop: '30px' }}></div>
				<span className="total-Container"> <p className="total">   المجموع</p>
					<div className="TotalPrice">  {calculateTotal()} ر.س  </div></span>
				<div style={{ margin: '4px', width: '280px', marginRight: '30px', marginLeft: '30px', marginTop: '30px' }}></div>
				<span className="total-Container"> <p className="total"> (%15)  ضريبة القيمة المضافة </p>
					<div className="TotalPrice">  {calculateTotal()} ر.س  </div></span>
				<div style={{ border: '1px solid #ccc', marginTop: '4px', width: '100%', marginTop: '30px' }}></div>
				<span className="total-Container"> <p className="total" style={{ fontSize: '16px', fontWeight: 'bold' }}>   المجموع</p>
					<div className="TotalPrice" style={{ fontSize: '16px', color: '#00CCC9' }}>  {calculateTotal()} ر.س  </div></span>

				<Grid container justifyContent="center" style={{ marginTop: '30px' }}>
					<Grid item>
						<Link to={`/payment/${orderDetails?.orderId}`} style={{ textDecoration: 'none', display: 'block' }}>
							<Button variant="contained" style={{ backgroundColor: '#B071AB', color: '#fff', width: '260px', fontSize: '18px' }}>
								إكمال الطلب
							</Button>
						</Link>
					</Grid>
				</Grid>
				<Grid container justifyContent="center" style={{ marginTop: '30px' }}>
					<Grid item>
						<Button variant="contained" style={{ backgroundColor: 'white', color: '#B071AB', width: '260px', fontSize: '18px', border: 'solid 1px #B071AB' }} onClick={onClose}>
							مواصلة التسوق
						</Button>

					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default ShoppingCartSlide;
