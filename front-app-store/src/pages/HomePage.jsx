import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sectionfooter from "../components/Sectionfooter";
import Thetreecards from "../components/Thetreecards";
import Reviews from "../components/FakeReviews";
import GreetingBanner from "../components/GreetingBanner";
import HomeSlider from "../components/HomeSlider";
import ProductsCarousel from "../components/ProductsCarousel";
import axios from 'axios';
import { baseUrl } from '../enveronment.js';
import "../styles/home.css";
import '../components/styles.scss';

const HomePage = () => {
	const [categories, setCategories] = useState([]);
	const defaultCategories = ["playstation5", "iphone15pro"];

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				let url = `${baseUrl}categories`;
				const response = await axios.get(url);
				if (response.status === 200) {
					const data = response.data;
					setCategories(data);
				} else {
					console.error("Failed to fetch categories. Status code:", response.status);
					console.error("Error response:", response.statusText);
				}
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchCategories();
	}, []);

	const whatsappNumber = "+966536456617";
	const whatsappMessage = "مرحبا!, انا اريد ان استفسر عن منتج,...";

	return (
		<>
			<div className="home">
				<GreetingBanner />
				<Header />
				<HomeSlider />
				<div className="containerWithShadow">
					<Cards categories={defaultCategories} />
					<ProductsCarousel category="iphone15pro" />
					<ProductsCarousel category="iphone14" />
				</div>
				<Thetreecards className="thetreecards" />
				<Reviews />
				<Sectionfooter className="sectionfooter" style={{ textAlign: "center" }} />
				<Footer className="footer" />
			</div>
			<div className="lastpage">
				<div className="waht">
					<a href={`https://wa.me/${whatsappNumber}/?text=${encodeURIComponent(whatsappMessage)}`}>
						<img src="https://cdn-icons-png.flaticon.com/128/3670/3670051.png" alt="" />
						<span>محادثة واتس اب</span>
					</a>
				</div>
			</div>
		</>
	);
};

export default HomePage;
