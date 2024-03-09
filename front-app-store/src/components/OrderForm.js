import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useShoppingCart } from "./ShoppingCartContext";
import "../styles/OrderForm.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PaymentPopup from "./PaymentPopup";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link as RouterLink } from "react-router-dom";
import "./styles.scss";

const OrderForm = ({ toggleOrderForm, product, quantity, image }) => {
  const {
    addToCart,
    monthlyInstallment,
    setMonthlyInstallment,
    setDiscountCode,
  } = useShoppingCart();
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [discountCode, setDiscount] = useState(0);
  const [orderId, setOrderId] = useState(uuidv4());
  const [colored, setColored] = useState(false);
  const [period, setPeriod] = useState("0");
  const navigate = useNavigate();
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  useEffect(() => {
    setFullName("");
    setAddress("");
    setPhone("");
    setDiscount("");
    setOrderId(uuidv4());
    setMonthlyInstallment("");
  }, [product, quantity]);

  useEffect(() => {
    setFullName("");
    setAddress("");
    setPhone("");
    setDiscount("");
    setOrderId(uuidv4());
    setMonthlyInstallment("");
  }, [product, quantity]);

  const isIPhone14Or15 =
    product.category === "iphone15" ||
    product.category === "iphone14" ||
    product.category === "iphone15pro" ||
    product.category === "iphone15plus";

  const handleOrderComplete = () => {
    const orderDetails = {
      fullName,
      address,
      phone,
      discountCode,
      orderId,
      selectedPeriod,
      monthlyInstallment,
    };

    const productDetails = {
      id: product.id,
      name: product.name,
      imageUrl: image?.imageUrl,
      price: product.price,
      quantity,
    };

    addToCart(productDetails);

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    setMonthlyInstallment(monthlyInstallment);

    navigate(`/payment/${orderId}`);
  };

  useEffect(() => {
    setDiscountCode(discountCode);
  }, [discountCode]);

  const handleShowMore = () => {
    setShowPaymentPopup(true);
  };

  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
  };

  const handleChange = (event) => {
    const selectedPeriod = event.target.value;
    setSelectedPeriod(selectedPeriod);
    calculateMonthlyInstallment(Number(selectedPeriod));
  };

  const handleSwitchChange = () => {
    setColored(!colored);
  };

  useEffect(() => {
    setDiscountCode(discountCode);
  }, [discountCode]);

  const calculateMonthlyInstallment = (selectedPeriod) => {
    const initialPayment = 1000;
    const numericPrice =
      parseFloat(product.price.replace(/[^\d٠-٩,]/g, "").replace(",", ".")) ||
      0;

    const totalPayment = numericPrice * quantity - initialPayment;

    let discountAmount = 0;
    if (discountCode) {
      if (totalPayment > 5000) {
        discountAmount = 250;
      } else if (totalPayment >= 2000 && totalPayment <= 4000) {
        discountAmount = 120;
      } else if (totalPayment >= 1000 && totalPayment < 1990) {
        discountAmount = 90;
      }
    }

    const totalWithDiscount = totalPayment - discountAmount;

    const monthlyInstallmentValue = totalWithDiscount / selectedPeriod;

    setMonthlyInstallment(monthlyInstallmentValue.toFixed(2));
  };

  return (
    <div className={`order-form-modal ${isIPhone14Or15 ? "centered" : ""}`}>
      <div className={`order-form-content ${isIPhone14Or15 ? "centered" : ""}`}>
        <h2> طلب {product.name}</h2>
        <span className="close" onClick={toggleOrderForm}>
          &times;
        </span>
        <form>
          <div className="form-group">
            <input
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "10px",
                fontSize: "18px",
              }}
              type="text"
              id="name"
              name="name"
              placeholder="الاسم ثلاثي"
              className="input-field"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "10px",
                fontSize: "18px",
              }}
              type="text"
              id="address"
              name="address"
              placeholder="العنوان واضح"
              className="input-field"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "10px",
                fontSize: "18px",
              }}
              type="text"
              id="phone"
              name="phone"
              placeholder=" رقم الجوال مراد تسليمه الطلب"
              className="input-field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "10px",
                fontSize: "18px",
              }}
              type="text"
              id="discount"
              name="discountCode"
              placeholder="كود الخصم"
              className="input-field"
              value={discountCode}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>

          {isIPhone14Or15 && (
            <div className="form-group custom-switch-container">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  id="custom-switch"
                  checked={colored}
                  onChange={handleSwitchChange}
                />
                <label htmlFor="custom-switch" className="custom-switch-label">
                  <span className="custom-switch-circle"></span>
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span className="switch-label" dir="rtl">
                  للطلب بنظام التقسيط
                </span>
                <div
                  className="daf3"
                  style={{
                    color: "red",
                    marginBottom: "4px",
                    marginRight: "10px",
                    textAlign: "center",
                  }}
                >
                  [ دفعة مقدمة الدفع 1000 ر.س ]
                </div>
              </div>
            </div>
          )}

          {colored && (
            <div>
              <div className="ta9sit" style={{ margin: "2px" }}>
                <label htmlFor="duration" style={{ fontSize: "11px" }}>
                  مدة الاقساط
                </label>
                <select
                  id="duration"
                  value={selectedPeriod}
                  onChange={handleChange}
                  style={{ fontSize: "10px", width: "100%" }}
                >
                  <option value={0}>إختر المدة</option>
                  <option value={1}>شهر</option>
                  <option value={2}>شهرين</option>
                  <option value={3}>3 أشهر</option>
                  <option value={12}>12 شهر</option>
                  <option value={24}>24 شهر</option>
                </select>
              </div>

              <input
                style={{
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  fontSize: "12px",
                  height: "14px",
                }}
                type="text"
                id="monthlyInstallment"
                placeholder=" القسط الشهري"
                label="القسط الشهري"
                value={monthlyInstallment}
                readOnly
              />
              <a
                href="#"
                className="button-link"
                onClick={handleShowMore}
                style={{ fontSize: "10px" }}
              >
                <CalendarMonthIcon style={{ marginRight: "5px" }} />
                كيفية التقسيط
              </a>
            </div>
          )}

          <div style={{ display: "inline", marginTop: "10px" }}>
            {fullName && phone && address ? (
              <RouterLink
                to={`/payment/${orderId}`}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={handleOrderComplete}
                >
                  استكمال الطلب
                </Button>
              </RouterLink>
            ) : (
              <Button
                variant="contained"
                style={{ backgroundColor: "gray", color: "white" }}
                disabled
              >
                استكمال الطلب
              </Button>
            )}
            <Button
              onClick={toggleOrderForm}
              style={{ color: "black", marginRight: "5px" }}
              variant="outlined"
            >
              تراجع
            </Button>
          </div>
          {showPaymentPopup && (
            <PaymentPopup
              open={showPaymentPopup}
              handleClose={handleClosePaymentPopup}
              period={selectedPeriod}
              monthlyInstallment={monthlyInstallment}
            />
          )}
        </form>
      </div>
    </div>
  );
};
export default OrderForm;
