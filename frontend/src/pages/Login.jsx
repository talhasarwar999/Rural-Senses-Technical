import React, { useState, useEffect } from "react";
//MATERIAL UI
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/LoginActions";
//REACT-ROUTER-DOM
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

//MAIN FORM ARROW FUNCTION
const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  //STATES
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // NAVIGATOR
  let navigate = useNavigate();
  //REDUX
    const dispatch = useDispatch();
    //CHECKING WHETHER USER IS AUTHENTICATED
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  //USE-EFFECT
    // useEffect(() => {
    //   if (userInfo) {
    //     navigate("/list");
    //     window.location.reload();
    //   } else {
    //     navigate("/");
    //   }
    // }, [navigate, userInfo]);
  //   //FUNCTION TO SEND USER_NAME AND PASSWORD TP BACKEND
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // localStorage.setItem("userInfo", JSON.stringify("token"));
    enqueueSnackbar("Logged In");
    // navigate("/create_user");
      // window.location.reload();
      dispatch(login(username, password));
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={6}
        md={7}
        sx={{
          backgroundImage:
            "url(https://media.istockphoto.com/id/1300371768/photo/we-want-your-feedback-written-by-red-megaphone-on-blue-background.jpg?b=1&s=170667a&w=0&k=20&c=nKoaOBbmPJ6u6qjnsHsF6-pstY7FK6FtNM54vaPjYyg=)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      />

      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "bold", color: "#5093D6" }}
          >
            Sign in
          </Typography>
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#5093D6",
              textDecoration: "underline",
              mt: 2,
            }}
          >
            Rural Senses
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5, width: { md: "400px" } }}
          >
            <Typography
              component="p"
              variant="p"
              sx={{ fontWeight: "bold", color: "#5093D6" }}
            >
              Username :
            </Typography>
            <TextField
              autoFocus
              required
              fullWidth
              margin="normal"
              id="username"
              name="username"
              autoComplete="username"
              label=""
              type="text"
              value={username}
              sx={{ backgroundColor: "#E8F0FE" }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography
              component="p"
              variant="p"
              sx={{ fontWeight: "bold", color: "#5093D6" }}
            >
              Password :
            </Typography>
            <TextField
              required
              margin="normal"
              fullWidth
              name="password"
              label=""
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              sx={{ backgroundColor: "#E8F0FE" }}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#396CAA" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
