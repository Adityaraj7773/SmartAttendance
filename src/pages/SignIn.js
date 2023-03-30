import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import clgLogo from "../images/ietdavv_logo.jpeg";
// import SignUp from "./SignUp";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../store/context";
import { AlertContext } from "./../store/AlertContext";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor("#2d6c35"),
    secondary: createColor("#61d800"),
  },
});

export default function SignInSide() {
  const router = useNavigate();
  const { Message } = React.useContext(AlertContext);
  const { setToken, setLoading, setLoadingText } =
    React.useContext(StateContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    if (data.get("email").length > 0 && data.get("password").length > 0) {
      setLoading(true);
      setLoadingText("Logging in...");
      fetch(`${process.env.REACT_APP_SERVER_URL}api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else if (res.status === 404) {
            // alert("User not found");
            Message().warning("User not found", false);
          } else if (res.status === 422) {
            // alert("Wrong Password");
            Message().warning("Wrong Password", false);
          } else {
            Message().error("Something went wrong", false);
            // alert("Something went wrong");
          }
        })
        .then((data) => {
          console.log(data);
          setToken(data.token);
          localStorage.setItem("token", data.token);
          router("/select");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // alert("Invalid Credentials");
      Message().warning("Invalid Credentials", false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          // sx={{
          //   backgroundImage: "url(https://source.unsplash.com/random)",
          //   backgroundRepeat: "no-repeat",
          //   backgroundColor: (t) =>
          //     t.palette.mode === "light"
          //       ? t.palette.grey[50]
          //       : t.palette.grey[900],
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          {/* <h1>hello</h1> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 7,
            }}
          >
            <img src={clgLogo} alt="IET DAVV" style={{ marginTop: 130 }} />
          </Box>
          <Box sx={{ mx: 4, textAlign: "center" }}>
            <h1 style={{ color: "#2d6c35" }}>Smart Attendance System</h1>
            <h3 style={{ color: "#2d6c35" }}>IET DAVV</h3>
            <p>
              Developed by Students of Electronics and Telecommunication
              Department of batch 2019-2023 and 2020-2024 under the guidance of
              Dr. Vaibhav Neema
            </p>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ":hover": { bgcolor: "#09af00" } }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
