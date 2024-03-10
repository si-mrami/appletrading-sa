import React from "react";
import { Link } from "react-router-dom";

const StickyButton = ({ productId, toggleOrderForm }) => {
  const handleClick = () => {
    toggleOrderForm();
  };

  return (
    <Link to={`/product/${productId}`}>
      <div
        className="sticky-button"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          padding: "10px",
          zIndex: 1000,
          borderRadius: "5px",
        }}
        onClick={handleClick}
      >
        اطلب الان
      </div>
    </Link>
  );
};

export default StickyButton;
