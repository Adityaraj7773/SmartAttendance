import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Domain } from "@mui/icons-material";
import { AlertContext } from "../store/AlertContext";
import { StateContext } from "../store/context";
import { useContext } from "react";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor("#2d6c35"),
    secondary: createColor("#61d800"),
  },
});

export default function SignUp() {
  const { Message } = React.useContext(AlertContext);
  const { setLoading, setLoadingText } = useContext(StateContext);
  const router = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("cpassword"),
    });
    if (
      data.get("email").length > 0 &&
      data.get("password") !== data.get("confirmPassword") &&
      data.get("password").length > 0 &&
      data.get("branch").length > 0 &&
      data.get("designation").length > 0 &&
      data.get("firstName").length > 0 &&
      data.get("lastName").length > 0 &&
      data.get("code").length > 0 &&
      data.get("code") === "IETSAS"
    ) {
      setLoading(true);
      setLoadingText("Signing Up...");
      fetch(`${process.env.REACT_APP_SERVER_URL}api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("password"),
          branch: data.get("branch"),
          designation: data.get("designation"),
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
        }),
      })
        .then((res) => {
          if (res.status === 201) {
            // alert("User Created Successfully");
            Message().success("User Created Successfully", false);
            router("/login");
          } else if (res.status === 422) {
            Message().warning("User already exists", false);
            // alert("User already exists");
          } else {
            Message().error("Something went wrong", false);
            // alert("Something went wrong");
          }
        })
        .then((data) => {
          console.log(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Message().warning("Please enter valid details", false);
      // alert("Please enter valid details");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="designation"
                  label="Designation"
                  name="designation"
                  autoComplete="designation"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="branch"
                  label="Branch"
                  name="branch"
                  autoComplete="branch"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="code"
                  label="Code"
                  name="code"
                  autoComplete="code"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="By agreeing, you grant access to your Google Drive for accessing and saving Attendance Files"
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, ":hover": { bgcolor: "#09af00" } }}
            >
              Create Account
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
