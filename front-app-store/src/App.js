import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./pages/HomePage";
import ProductDetails from "./components/ProductDetails";
import Thetreecards from "./components/Thetreecards";
import Fastdelivery from "./pages/Fastdelivery";
import Immediatemobilemaintenance from "./pages/Immediatemobilemaintenance";
import TermsandConditions from "./pages/TermsandConditions";
import Privacypolicy from "./pages/privacypolicy";
import About from "./pages/About";
import Returnsandexchanges from "./pages/Returnsandexchanges";
import PaymentForm from "./components/PaymentForm";
import ApproveReview from "./pages/approve-review.jsx";
import DisapproveReview from "./pages/disapprove-review.jsx";
import ProductByHashtags from "./pages/Productbyhashtags.jsx";
import OrderConfirmation from "./components/OrderConfirmation.js";
import { ShoppingCartProvider } from "./components/ShoppingCartContext.jsx";
import VerifyOrder from "./components/VerifyOrder.js";
import Iphone15 from "./pages/iphone15.jsx";
import PaymentPopup from "./components/PaymentPopup";
import { useEffect, useState } from "react";
import Products from "./pages/Products.jsx";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { baseUrl } from  "./enveronment.js";


function App() {
  const [categories, setCategories] = useState([]);
  const defaultCategories = ["iphone15", "iphone15pro", "iphone15plus"];

useEffect(() => {
  const fetchCategories = async () => {
    try {
      let url = `${baseUrl}categories`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setCategories(response.data);
      } else {
        console.error(
          "Failed to fetch categories. Status code:",
          response.status
        );
        const errorData = await response.text();
        console.error("Error response:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchCategories();
}, []);


  return (
    <div className="App">
      <Router>
        <ShoppingCartProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/الرئيسية" />} />
            <Route path="/الرئيسية" element={<HomePage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/cards" element={<Thetreecards />} />
            <Route path="/fastdelivery" element={<Fastdelivery />} />
            <Route
              path="/maintenance"
              element={<Immediatemobilemaintenance />}
            />
            <Route path="/TermandConditions" element={<TermsandConditions />} />
            <Route path="/Privacypolicy" element={<Privacypolicy />} />
            <Route path="/About" element={<About />} />
            <Route
              path="/Returnandexchanges"
              element={<Returnsandexchanges />}
            />
            <Route path="/payment/:orderId" element={<PaymentForm />} />
            <Route path="/About" element={<About />} />
            <Route
              path="/Returnandexchanges"
              element={<Returnsandexchanges />}
            />
            <Route path="/laptops" element={<Products category="laptop"/>} />
            <Route path="/Ipads" element={<Products category="ipad"/>} />
            <Route path="/Playstations" element={<Products category="playstation5"/>} />
            <Route path="/watches" element={<Products category="watche"/>} />
            <Route
              path="/playstation-accessories"
              element={<Products category="accessories"/>}
            />
             <Route path="/iphone14" element={<Products  category="iphone14"/>} />
            <Route
              path="/iphones15"
              element={<Iphone15 categories={defaultCategories} />}
            />
            <Route path="/approve-review/:id" element={<ApproveReview />} />
            <Route
              path="/order-confirmation/:orderId"
              element={<OrderConfirmation />}
            />
            <Route
              path="/disapprove-review/:id"
              element={<DisapproveReview />}
            />

            <Route
              path="/products-by-hashtags/:hashtag"
              element={<ProductByHashtags />}
            />
            <Route path="/verifyOrder" element={<VerifyOrder />} />
            <Route path="/PaymentPopup" element={<PaymentPopup />} />
          </Routes>
        </ShoppingCartProvider>
      </Router>
    </div>
  );
}

export default App;
