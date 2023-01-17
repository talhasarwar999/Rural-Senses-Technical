import React, { useState } from "react";
//REDUX
import { useDispatch } from "react-redux";
import { UploadDataAction } from "../redux/actions/UploadDataActions";
//Material UI
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
//Snackbar
import { useSnackbar } from "notistack";
//React Router Dom
import { useNavigate } from "react-router-dom";

function UploadData() {
  //State
  const [file, setFile] = useState();
  const [community, setCommunity] = useState("");
  const [communitySize, setCommunitySize] = useState("");
  //File Reader
  const fileReader = new FileReader();
  //Snackbar
  const { enqueueSnackbar } = useSnackbar();
  //Redux
  const dispatch = useDispatch();
  // NAVIGATOR
  let navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(UploadDataAction(community, communitySize, file)).then(() => {
      enqueueSnackbar("Uploaded Succesfully");
      navigate("/Statistics");
    });

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        console.log(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <Box sx={{ backgroundColor: "#7EB3E5", minHeight: "100vh", width: "100%" }}>
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
            justifyContent: "center",
            mt: 7,
          }}
        >
          <Typography
            component="h6"
            variant="h6"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            Hello, Community Social Worker
          </Typography>
          <Typography
            component="h5"
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "white",
              textDecoration: "underline",
              my: 3,
            }}
          >
            Welcome to Upload CSV
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3, width: { md: "400px" }, mx: 2 }}
          >
            <Typography
              component="p"
              variant="p"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Community Name:
            </Typography>
            <TextField
              autoFocus
              required
              fullWidth
              margin="normal"
              id="community"
              name="community"
              autoComplete="community"
              label=""
              type="text"
              value={community}
              sx={{ backgroundColor: "#E8F0FE" }}
              onChange={(e) => setCommunity(e.target.value)}
            />
            <Typography
              component="p"
              variant="p"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Community Size:
            </Typography>
            <TextField
              autoFocus
              required
              fullWidth
              margin="normal"
              id="communitySize"
              name="communitySize"
              autoComplete="communitySize"
              label= ""
              type="number"
              value={communitySize}
              sx={{ backgroundColor: "#E8F0FE" }}
              onChange={(e) => setCommunitySize(e.target.value)}
            />
            <Typography
              component="p"
              variant="p"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              CSV:
            </Typography>
            <TextField
              required
              fullWidth
              margin="normal"
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              sx={{ backgroundColor: "#E8F0FE" }}
              onChange={handleOnChange}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#396CAA" }}
              onClick={(e) => {
                handleOnSubmit(e);
              }}
            >
              IMPORT CSV
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default UploadData;
