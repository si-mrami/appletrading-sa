import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useShoppingCart } from './ShoppingCartContext.jsx';
import "../styles/PaymentForm.css";
import axios from 'axios';
import { baseUrl } from '../enveronment.js';
import './styles.scss'


const PaymentForm = () => {
	const { orderId } = useParams();
	const [orderDetails, setOrderDetails] = useState(null);
	const { calculateTotal, cartItems, monthlyInstallment } = useShoppingCart();
	const navigate = useNavigate();

	const [paymentDetails, setPaymentDetails] = useState({
		cardName: '',
		cardNumber: '',
		expiryDate: '',
		cvvCode: '',
	});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const storedOrderDetails = localStorage.getItem('orderDetails');
		const parsedOrderDetails = storedOrderDetails ? JSON.parse(storedOrderDetails) : null;
		setOrderDetails(parsedOrderDetails);
	}, []);

	const handleCardNameChange = (e) => {
		const inputText = e.target.value;
		const sanitizedInput = inputText.replace(/[^A-Za-z\u0600-\u06FF ]/g, '');
		setPaymentDetails({ ...paymentDetails, cardName: sanitizedInput });
	};

	const handleCardNumberChange = (e) => {
		const inputText = e.target.value;
		const sanitizedInput = inputText.replace(/[^0-9]/g, '');
		const truncatedInput = sanitizedInput.slice(0, 16);
		setPaymentDetails({ ...paymentDetails, cardNumber: truncatedInput });
	};

	const handleCvvCodeChange = (e) => {
		const inputText = e.target.value;
		const sanitizedInput = inputText.replace(/[^0-9]/g, '');
		const truncatedInput = sanitizedInput.slice(0, 3);
		setPaymentDetails({ ...paymentDetails, cvvCode: truncatedInput });
	};

	const handleExpiryDateChange = (e) => {
		const inputText = e.target.value;

		const sanitizedInput = inputText.replace(/[^0-9]/g, '');

		const truncatedInput = sanitizedInput.slice(0, 4);

		const month = truncatedInput.slice(0, 2);
		const year = truncatedInput.slice(2, 4);

		if (month < '01' || month > '12') {
			alert('الرجاء إدخال شهر صالح (01 إلى 12).');
			return;
		}

		const formattedDate = `${month}/${year}`;

		setPaymentDetails({ ...paymentDetails, expiryDate: formattedDate });
	};

	//   const baseUrl = getBaseUrl();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (paymentDetails.cardNumber.length !== 16) {
			alert('الرجاء إدخال رقم بطاقة صالح مكون من 16 رقمًا.');
			return;
		}

		if (paymentDetails.cvvCode.length !== 3) {
			alert('الرجاء إدخال رمز CVV صالح مكون من 3 أرقام.');
			return;
		}

		setLoading(true);

		try {
			let url = `${baseUrl}send-order-email`;
			const response = await axios.post(url, {
				paymentDetails,
				orderDetails,
				productDetails: cartItems,
				total: calculateTotal(),
				monthlyInstallment: monthlyInstallment,
				Peroid: orderDetails.selectedPeriod,
			});

			if (response.status === 200) {
				const result = response.data;

				navigate(`/order-confirmation/${orderId}`);
			} else {
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}

	};

	return (
		<>
			<Header />
			<div className="paymentForme">
				<div className="items">
					<h2>: الدفع باستخدام بطاقة الأئتمان او بطاقة الخصم</h2>
					<hr />
					<form onSubmit={handleSubmit}>
						<div className="element">
							<label>اسم العميل / ة:</label>
							{orderDetails && (
								<span>{orderDetails.fullName || ''}</span>)}
						</div>
						<hr />
						<div className="element">
							<label>رقم الجوال :</label>
							{orderDetails && (
								<span>{orderDetails.phone || ''}</span>)}
						</div>
						<hr />
						<div className="element">
							<label>العنوان :</label>
							{orderDetails && (
								<span>{orderDetails.address || ''}</span>)}
						</div>
						<hr />
						<div style={{ whiteSpace: 'nowrap' }}>
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Mada_Logo.svg"
								alt="مدى Mada Logo"
								className="mada-logo"
								style={{ display: 'inline-block', margin: '5px' }}
							/>
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Old_Visa_Logo.svg"
								alt="visa Logo"
								className="visa-logo"
								style={{ display: 'inline-block', margin: '5px' }}
							/>
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/4/48/MasterCard-Logo.svg"
								alt="MasterCard Logo"
								className="MasterCard-logo"
								style={{ display: 'inline-block', margin: '5px' }}
							/>
						</div>

						<hr />

						<div className="form-group2">
							<input
								className="input1"
								style={{ backgroundColor: '#E0E0E0', borderRadius: '40px' }}
								type="text"
								name="NameCard"
								placeholder="الاسم المدون على البطاقة"
								value={paymentDetails.cardName}
								onChange={(e) => handleCardNameChange(e)}
								required
							/>
						</div>
						<hr />
						<div className="form-group">
							<input
								className="input1"
								style={{ backgroundColor: '#E0E0E0', borderRadius: '40px' }}
								type="text"
								name="NumbCard"
								placeholder="رقم البطاقة"
								value={paymentDetails.cardNumber}
								onChange={(e) => handleCardNumberChange(e)}
								required
							/>
						</div>
						<hr />
						<div className="form-group">
							<input
								className="input1"
								style={{ backgroundColor: '#E0E0E0', borderRadius: '40px' }}
								type="text"
								name="ExpiryDate"
								placeholder=" السنة/الشهر  تاريخ الانتهاء"
								value={paymentDetails.expiryDate}
								onChange={(e) => handleExpiryDateChange(e)}
								required
							/>
						</div>
						<hr />
						<div className="form-group">
							<input
								className="input1"
								style={{ backgroundColor: '#E0E0E0', borderRadius: '40px' }}
								type="text"
								name="cvvCode"
								placeholder="رمز CVV"
								value={paymentDetails.cvvCode}
								onChange={(e) => handleCvvCodeChange(e)}
								required
							/>
						</div>
						<hr />
						<button type="submit" className="buttnSabmuit">
							{loading && (
								<div className="loading-spinner">
									<CircularProgress size={24} color="inherit" />
								</div>
							)}
							{!loading && <span>تأكيد الدفع</span>}
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default PaymentForm;
