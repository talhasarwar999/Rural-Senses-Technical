import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
//REDUX
import { useDispatch } from "react-redux";
import { CreateUserAction } from "../redux/actions/CreateUserActions";
import { useSnackbar } from "notistack";

const CreateUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  //STATES
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  //REDUX
  const dispatch = useDispatch();
  //CHECKING WHETHER USER IS AUTHENTICATED
  const errorHandle = localStorage.getItem("error");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(CreateUserAction(username, password, role)).then(() => {
      enqueueSnackbar(errorHandle|| "created succesfully");
    });
    console.log(localStorage.getItem("error"));
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
                <MenuItem value={"CommunitySocialWorker"}>
                  Community Social Worker
                </MenuItem>
                <MenuItem value={"PublicOfficial"}>Public Official</MenuItem>
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
              Create User
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default CreateUser;
