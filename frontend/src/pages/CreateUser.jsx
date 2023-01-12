import React, {useState, useEffect} from 'react'
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/LoginActions";
//REACT-ROUTER-DOM
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  //STATES
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   const [role, setRole] = React.useState("");

   const handleChange = (event) => {
     setRole(event.target.value);
   };
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
    // navigate("/create_user");
    // window.location.reload();
    //   dispatch(login(username, password));
  };
  return (
    <Box sx={{ backgroundColor: "#7EB3E5", minHeight: "100vh" }}>
      {" "}
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
            mt: 7,
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            Hello Admin
          </Typography>
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "white",
              textDecoration: "underline",
              my: 3,
            }}
          >
            Create User Role
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3, width: { md: "400px" } }}
          >
            <Typography
              component="p"
              variant="p"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              User Role :
            </Typography>
            <FormControl
              sx={{
                color: "#E8F0FE",
                backgroundColor: "#E8F0FE",
                minWidth: 400,
                my: 2,
              }}
            >
              <Select
                value={role}
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={10}>Community Social Worker</MenuItem>
                <MenuItem value={20}>Public Official</MenuItem>
                <MenuItem value={30}>Admin</MenuItem>
              </Select>
            </FormControl>
            <Typography
              component="p"
              variant="p"
              sx={{ fontWeight: "bold", color: "white" }}
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
              sx={{ fontWeight: "bold", color: "white" }}
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
    </Box>
  );
}

export default CreateUser