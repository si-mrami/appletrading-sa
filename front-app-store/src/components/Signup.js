import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Grid from "@mui/material/Grid";
import { baseUrl } from '../enveronment.js';
import './styles.scss'


const Signup = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

//   const baseUrl = getBaseUrl();

  async function submit(e) {
    e.preventDefault();

    try {
      let url = `${baseUrl}signup`;
      const response = await axios.post(url, {
        email,
        password,
        username,
      });

      if (response.data.status === "exist") {
        alert("المستخدم موجود اصلا");
      } else if (response.data.status === "notexist") {
        history("/login", { state: { id: email } });
      }
    } catch (error) {
      alert("حدث خطأ");
      console.log(error);
    }
  }

  return (
    <Container className="loginstyle"
      component="main"
      maxWidth="xs"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PersonAddIcon sx={{ fontSize: "3rem", margin: "0 auto" }} />
        <Typography component="h1" variant="h5">
        إنشاء حساب
        </Typography>
        <form onSubmit={submit} className="loginForme" sx={{ width: "100%", marginTop: 1 }}>
          <input
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="عنوان البريد الإلكتروني"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="كلمة المرور"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            placeholder="اسم المستخدم"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            إنشاء حساب
          </Button>
        </form>
        <Grid container justifyContent="center">
          <Grid className="linktag" item>
            <Link to="/login" variant="body2">
				هل لديك حساب؟ تسجيل الدخول
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Signup;
