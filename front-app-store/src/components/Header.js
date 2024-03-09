import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "@mui/material/Menu";
import MenuDrawer from "./MenuDrawer";
import "../styles/Header.css";
import { baseUrl } from "../enveronment.js";
import { useShoppingCart } from "./ShoppingCartContext";
import ShoppingCartSlide from "./ShoppingCartSlide";
import List from "@material-ui/core/List";
import MSLogo from "../Assets/MS.jpeg";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContent, setFilteredContent] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [username, setUsername] = useState("");
  const { getCartItemCount } = useShoppingCart();
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/الرئيسية") {
      setSelectedMenuItem("الرئيسية");
    } else if (path === "/Playstations") {
      setSelectedMenuItem("اجهزة بلاستيشن");
    } else if (path === "/playstation-accessories") {
      setSelectedMenuItem("اكسسوارات بلاستيشن");
    } else if (path === "/watches") {
      setSelectedMenuItem(" ساعات");
    } else if (path === "/Ipads") {
      setSelectedMenuItem("ايبادات ابل");
    } else if (path === "/laptops") {
      setSelectedMenuItem("اجهزة لابتوب");
    } else if (path === "/login") {
      setSelectedMenuItem("تسجيل الدخول");
    } else {
      setSelectedMenuItem("");
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username);
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setIsSearchPanelOpen(false);
  };

  const handleSearchClick = () => {
    setIsSearchPanelOpen(true);
    setSearchVisible(true);
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      let url = `${baseUrl}search?query=${query}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching search results:", errorData.message);
        return;
      }

      const data = await response.json();
      setFilteredContent(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchClose = () => {
    setIsSearchPanelOpen(false);
    setSearchVisible(false);
    setSearchQuery("");
    setFilteredContent([]);
  };

  const handleLoginClick = () => {
    navigate("/login");
    handleClose();
  };

  const handleSignupClick = () => {
    navigate("/signup");
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsSearchPanelOpen(false);
  };

  const handleMenuItemClick = (menuItem) => {
    if (menuItem === "الرئيسية") {
      navigate("/الرئيسية");
    } else if (menuItem === "اجهزة بلاستيشن") {
      navigate("/Playstations");
    } else if (menuItem === "اكسسوارات بلاستيشن") {
      navigate("/playstation-accessories");
    } else if (menuItem === " ساعات") {
      navigate("/watches");
    } else if (menuItem === "ايبادات ابل") {
      navigate("/Ipads");
    } else if (menuItem === "اجهزة لابتوب") {
      navigate("/laptops");
    } else if (menuItem === "تسجيل الدخول") {
      navigate("/login");
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    setUsername("");
    navigate("/الرئيسية");
    handleClose();
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearchResultClick = (productId) => {
    navigate(`/product/${productId}`);
    setIsSearchPanelOpen(false);
  };

  const handleInputClick = (event) => {
    event.stopPropagation();
  };

  const handleSearchIconClick = () => {
    if (searchVisible) {
      handleSearchClose();
    } else {
      handleSearchClick();
    }
  };

  return (
    <div
      style={{ width: "100%", marginBottom: "0px" }}
      className="navy-background"
    >
      <div className="header">
        <div
          className="icon-container"
          style={{ fontSize: window.innerWidth <= 600 ? "20px" : "30px" }}
          onClick={handleCartClick}
        >
          <ShoppingCartOutlinedIcon
            className="header-icon"
            style={{ border: "solid 2px white", borderRadius: "50%" }}
          />
          {getCartItemCount() > 0 && (
            <span className="cart-item-count">{getCartItemCount()}</span>
          )}
        </div>
        <div className="icon-container" onClick={handleSearchIconClick}>
          <SearchIcon
            className="header-icon"
            style={{ border: "solid 2px white", borderRadius: "50%" }}
          />
          {searchVisible && (
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onClick={handleInputClick}
              placeholder="إبحث عن منتج..."
              className="search-input"
            />
          )}
          {filteredContent.length > 0 && isSearchPanelOpen && (
            <div className="search-results-panel">
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  color: "black",
                  cursor: "pointer",
                }}
                onClick={handleSearchClose}
              >
                <CloseIcon style={{ fontSize: 30 }} />
              </div>
              <ul>
                {filteredContent.map((result) => (
                  <li
                    key={result._id}
                    onClick={() => handleSearchResultClick(result._id)}
                  >
                    {result.name}
                  </li>
                ))}
              </ul>
              {filteredContent.length === 0 && (
                <div className="no-result-found">لا يوجد نتائج</div>
              )}
            </div>
          )}
        </div>

        <div className="icon-container" onClick={handleClick}>
          <PersonOutlineOutlinedIcon
            className="header-icon"
            style={{ border: "solid 2px white", borderRadius: "50%" }}
          />
          <span className="username">{username}</span>
        </div>

        <div className="flexible-space"></div>
        <div className="icon-container" style={{ marginRight: "10px" }}>
          <img
            src={MSLogo}
            alt="MS Logo"
            style={{ height: "30px", width: "30px", borderRadius: "50%" }}
          />
        </div>

        <div className="icon-container" onClick={toggleMenu}>
          <MenuIcon className="header-icon" />
        </div>
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <List className="menu-list">
          <div
            onClick={handleSignupClick}
            style={{
              color: "black",
              paddingTop: "0",
              cursor: "pointer",
              transition: "background 0.3s",
              padding: "4px",
              margin: "5px",
            }}
          >
            إنشاء حساب
          </div>
          <div
            onClick={handleLoginClick}
            style={{
              color: "black",
              paddingTop: "0",
              cursor: "pointer",
              transition: "background 0.3s",
              padding: "4px",
              margin: "5px",
            }}
          >
            تسجيل الدخول
          </div>
          <div
            onClick={handleLogoutClick}
            style={{
              color: "black",
              paddingTop: "0",
              cursor: "pointer",
              transition: "background 0.3s",
              padding: "4px",
              margin: "5px",
            }}
          >
            تسجيل الخروج
          </div>
        </List>
      </Menu>

      <MenuDrawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleMenuItemClick={handleMenuItemClick}
        selectedMenuItem={selectedMenuItem}
        username={username}
      />

      <ShoppingCartSlide
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default Header;
