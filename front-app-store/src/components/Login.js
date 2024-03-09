import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import { baseUrl } from "../enveronment";

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

	// const baseUrl = getBaseUrl();

    try {
        const response = await axios.post(baseUrl, {
            email,
            password,
        });

        if (response.data.status === "success") {
            localStorage.setItem("user", JSON.stringify({
                id: response.data.id,
                username: response.data.username
            }));

            history("/الرئيسية");
        } else if (response.data.status === "incorrect-password") {
            alert("كلمة سر خاطئة");
        } else if (response.data.status === "notexist") {
            alert("المستخدم غير موجود");
        } else {
            alert("فشل تسجيل الدخول");
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
      <Paper elevation={3} sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <LockIcon sx={{ fontSize: "3rem", margin: "0 auto" }} />
        <Typography component="h1" variant="h5">
        تسجيل الدخول
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            تسجيل الدخول
          </Button>
        </form>
        <Grid container justifyContent="center">
          <Grid className="linktag" item>
            <Link to="/signup" variant="body2">
              {"ليس لديك حساب؟ اشتراك"}
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
