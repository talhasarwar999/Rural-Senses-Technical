import React, { useState, useEffect } from "react";
//MATERIAL UI
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/LoginActions";
//REACT-ROUTER-DOM
import { useNavigate } from "react-router-dom";
//Snackbar
import { useSnackbar } from "notistack";
//Cookie
import GetCookie from "../hooks/getCookie";

//MAIN FORM ARROW FUNCTION
const Login = () => {
  //STATES
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [social] = useState(
    GetCookie("user") === '"CommunitySocialWorker"' ? true : null
  );
  const [admin] = useState(GetCookie("user") === '"Admin"' ? true : null);
  const [error] = useState(GetCookie("error") ? true : null);
  const [formErrors, setFormErrors] = useState({});
  //Snackbar
  const { enqueueSnackbar } = useSnackbar();
  // NAVIGATOR
  let navigate = useNavigate();
  //REDUX
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //CHECKING WHETHER USER IS AUTHENTICATED

  useEffect(() => {
    if (userInfo) {
      if (admin) {
        navigate("/create_user");
      } else if (social) {
        navigate("/upload");
      } else {
        enqueueSnackbar("SuccessFully Logged In", {
          variant: "success",
        });
        navigate("/p-statistics");
      }
    }
  }, [navigate, userInfo, enqueueSnackbar, error, admin, social]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
    setFormErrors(validate(userInfo));
  };
  const validate = () => {
    const errors = {};
    if (!username) {
      // errors.email = "email required";
      enqueueSnackbar("username required", {
        variant: "error",
      });
    }
    if (!password) {
      // errors.password = "password required";
      enqueueSnackbar("Password required", {
        variant: "error",
      });
    }
    if (error) {
      enqueueSnackbar("incorrect email or password", {
        variant: "error",
      });
    }
    return errors;
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
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
              component="h4"
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#5093D6",
                textDecoration: "underline",
                mt: 2,
              }}
            >
              Rural Sense
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5, width: { md: "400px" }, mx: 2 }}
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
            <Typography variant="subtitle2" component="p" color="error">
              {formErrors.email}
            </Typography>
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
