import React, { createContext, useContext, useReducer, useState } from 'react';

const initialState = [];
const shoppingCartReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CART_ITEMS':
			return action.payload;
		case 'ADD_NEW_ITEM':
		case 'UPDATE_QUANTITY':
			return action.payload;
		case 'REMOVE_FROM_CART':
			return state.filter((item) => item.id !== action.payload);
		default:
			return state;
	}
};

export const ShoppingCartContext = createContext();



export const ShoppingCartProvider = ({ children }) => {

	const [monthlyInstallment, setMonthlyInstallment] = useState('');
	const [discountCode, setDiscountCode] = useState('');

	const storedItems = JSON.parse(localStorage.getItem('cartItems')) || initialState;
	const [cartItems, dispatch] = useReducer(shoppingCartReducer, storedItems);

	const addToCart = (orderDetails) => {
		// console.log('Adding to cart:', orderDetails);
		const existingItemIndex = cartItems.findIndex((item) => item.id === orderDetails.id);
		if (existingItemIndex !== -1) {
			const updatedItems = cartItems.map((item, index) =>
				index === existingItemIndex
					? { ...item, quantity: item.quantity + (orderDetails.quantity || 1) }
					: item
			);
			dispatch({ type: 'UPDATE_QUANTITY', payload: updatedItems });
			localStorage.setItem('cartItems', JSON.stringify(updatedItems));
		} else {
			const updatedItems = [...cartItems, { ...orderDetails, quantity: orderDetails.quantity || 1 }];

			dispatch({ type: 'ADD_NEW_ITEM', payload: updatedItems });
			localStorage.setItem('cartItems', JSON.stringify(updatedItems));
		}
	};


	const getCartItemCount = () => {
		return cartItems.length;
	};

	const removeFromCart = (productId) => {
		const updatedItems = cartItems.filter((item) => item.id !== productId);
		// console.log('Updated Items:', updatedItems);
		dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
		localStorage.setItem('cartItems', JSON.stringify(updatedItems));
		// console.log('Cart items removed from local storage');
	};



	const convertPriceToNumeric = (priceString) => {
		const numericValue = parseFloat(priceString.replace(/[^\d٠-٩,]/g, '').replace(',', '.')) || 0;
		return numericValue;
	};

	const calculateTotal = () => {
		const totalWithoutDiscount = cartItems.reduce((total, item) => {
			const priceNumeric = convertPriceToNumeric(item.price);
			return total + priceNumeric * item.quantity;
		}, 0);

		let discountAmount = 0;
		if (discountCode) {
			if (totalWithoutDiscount > 5000) {
				discountAmount = 250;
			} else if (totalWithoutDiscount >= 2000 && totalWithoutDiscount <= 4000) {
				discountAmount = 120;
			} else if (totalWithoutDiscount >= 1000 && totalWithoutDiscount < 1990) {
				discountAmount = 90;
			}
		}

		const totalWithDiscount = totalWithoutDiscount - discountAmount;
		return totalWithDiscount.toFixed();
	};



	const updateQuantity = (productId, newQuantity) => {
		const updatedItems = cartItems.map((item) =>
			item.id === productId ? { ...item, quantity: newQuantity } : item
		);
		dispatch({ type: 'UPDATE_QUANTITY', payload: updatedItems });
		localStorage.setItem('cartItems', JSON.stringify(updatedItems));
	};

	return (
		<ShoppingCartContext.Provider value={{
			cartItems, addToCart, getCartItemCount, calculateTotal, removeFromCart, updateQuantity,
			monthlyInstallment, setMonthlyInstallment, setDiscountCode,
		}}>
			{children}
		</ShoppingCartContext.Provider>
	);
};

export const useShoppingCart = () => {
	return useContext(ShoppingCartContext);
};
