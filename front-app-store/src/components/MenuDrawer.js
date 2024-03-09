import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import profile from '../Assets/profile.png';
import "../styles/Header.css";
import './styles.scss'


const MenuDrawer = ({
  menuOpen,
  setMenuOpen,
  handleMenuItemClick,
  selectedMenuItem,
  username,
}) => {
  return (
    <Drawer
      anchor="right"
      open={menuOpen}
      onClose={() => setMenuOpen(false)}
      style={{ fontSize: 20, margin: 0, paddingTop: 0 }}
	  className="sideMenu"
    >
      <div style={{ position: 'absolute', top: 0, left: 0, borderRadius: '50%', background: 'white', padding: '0px' }}>
        <IconButton onClick={() => setMenuOpen(false)} style={{ color: 'black', fontSize: '15px' }}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className="sideMenu" style={{ paddingTop: 0, width: "280px" }}>
        <div
          style={{
            background: "rgb(4, 4, 74)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 0,
            marginBottom: 0,
            margin: 0,
          }}
        >
          <IconButton>
            <img
              src={profile}
              alt="Profile"
              style={{ width: 50, height: 50, padding: '0 px', margin: '0 px' }}
            />
          </IconButton>
          {username ? (
            <div style={{ color: "white", paddingTop: 0 }}>
              {username}
            </div>
          ) : (
            <div
              onClick={() => handleMenuItemClick("تسجيل الدخول")}
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "1px",
                borderRadius: "50px",
                marginTop: "10px",
                marginBottom: "40px",
                cursor: "pointer",
                border: selectedMenuItem === "تسجيل الدخول" ? "2px solid red" : "none",
                fontSize: "16px",
                width: "100px",
                textAlign: "center"
              }}
            >
              تسجيل الدخول
            </div>
          )}
        </div>

        <div
          onClick={() => handleMenuItemClick("فئات المنتجات")}
          style={{
            color: selectedMenuItem === "فئات المنتجات" ? "red" : "Gray",
            textAlign: "right",
            marginRight: '10px',
            marginBottom: '20px',
            fontFamily: "Tajawal, sans-seri"
          }}
        >
          فئات المنتجات
        </div>
        <div
          onClick={() => handleMenuItemClick("الرئيسية")}
          style={{
            color: selectedMenuItem === "الرئيسية" ? "red" : "black",
            textAlign: "right",
            marginRight: '10px',
            marginBottom: '20px',
            fontFamily: "Tajawal, sans-seri",
            cursor: 'pointer'
          }}
        >
          الرئيسية
        </div>
        <div
          onClick={() => handleMenuItemClick("اجهزة بلاستيشن")}
          style={{
            color: selectedMenuItem === "اجهزة بلاستيشن" ? "red" : "black",
            textAlign: "right", marginRight:'10px', cursor: "pointer",
            transition: "background 0.3s",
            marginBottom: '20px',
            fontFamily: "Tajawal, sans-seri",
          }}
        >
          أجهزة بلايستيشن
        </div>
        <div
          onClick={() => handleMenuItemClick("اكسسوارات بلاستيشن")}
          style={{
            color:
              selectedMenuItem === "اكسسوارات بلاستيشن" ? "red" : "black",
              textAlign: "right", marginRight:'10px', cursor: "pointer",
              transition: "background 0.3s",
            marginBottom: '20px',
            fontFamily: "Tajawal, sans-seri",
          }}
        >
          أكسسوارات بلايستيشن
        </div>
        <div
          onClick={() => handleMenuItemClick(" ساعات")}
          style={{
            color: selectedMenuItem === " ساعات" ? "red" : "black",
            textAlign: "right",
            marginRight: '10px',
            marginBottom: '20px',
            fontFamily: "Tajawal, sans-seri",
            cursor: 'pointer'
          }}
        >
          ساعات
        </div>
        <div
          onClick={() => handleMenuItemClick("ايبادات ابل")}

          style={{
            color: selectedMenuItem === "ايبادات ابل" ? "red" : "black",
            textAlign: "right",
            marginRight: '10px',
            marginBottom: '20px',
            fontFamily: "Tajawal, sans-seri",
            cursor: 'pointer'
          }}
        >
          ايبادات ابل
        </div>

        <div
          onClick={() => handleMenuItemClick("اجهزة لابتوب")}
          style={{
            color: selectedMenuItem === "اجهزة لابتوب" ? "red" : "black",
            textAlign: "right", marginRight:'10px', cursor: "pointer",
            transition: "background 0.3s",
            marginBottom: '20px',
            fontFamily: "Tajawal, sans-seri"
          }}
        >
          اجهزة لابتوب
        </div>
      </div>
    </Drawer>
  );
};
export default MenuDrawer;
