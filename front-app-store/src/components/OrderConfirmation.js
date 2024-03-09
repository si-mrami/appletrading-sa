import React, { useState, useEffect } from "react";
import { BsCartPlus } from "react-icons/bs";
import Header from "./Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCartContext";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "../styles/OrderConfirmation.css";
import { baseUrl } from "../enveronment.js";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [timer, setTimer] = useState(120);
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { removeFromCart } = useShoppingCart();

  const sendConfirmationCode = async () => {
    try {
      setLoading(true);

      let url = `${baseUrl}send-confirmation-code`;
      const response = await axios.post(url, {
        confirmationCode: code,
      });

      if (response.data.status === "success") {
        // console.log("Confirmation code sent successfully!");
        removeFromCart();
        navigate(`/verifyOrder`, { state: { fromOrderConfirmation: true } });
        setCodeSent(true);
      } else {
        console.error(
          "Failed to send confirmation code:",
          response.data.message
        );
      }
    } catch (error) {
      //   console.error("Error sending confirmation code:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(countdown);
        window.location.reload();
        setTimer(60);
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  // const { state } = useLocation();
  // const isComingFromCorrectRoute = state && state.fromPayment;
  // if (!isComingFromCorrectRoute) {
  //   navigate('/الرئيسية');
  //   return null;
  // }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="title-container">
          <h1 className="title">للتحقق من عملية الشراء</h1>
        </div>
        <div className="content">
          <div className="timer">
            <span>
              {Math.floor(timer / 60)}:
              {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
            </span>
          </div>
          <p className="paragraphe">
            تم ارسال رمز التحقق الى جوالكم لتأكيد الدفع. يرجى كتابة الكود الموضح
            أدناه.
          </p>
          <div className="rtl-text">
            <span className="rtl-span">كود التحقق</span>
          </div>
          <input
            style={{ backgroundColor: "#fff" }}
            type="text"
            placeholder="xxxxxx"
            value={code}
            onChange={(e) => {
              const input = e.target.value;

              if (/^\d{0,6}$/.test(input)) {
                setCode(input);
              }
            }}
            required
          />

          <button
            className="confirm-button"
            onClick={sendConfirmationCode}
            disabled={loading || code.length !== 6}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <div className="buttonConfi">
                <BsCartPlus className="icon" />
                <span>تاكيد الطلب</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
