import React, { useState } from "react";
//REDUX
import { useDispatch } from "react-redux";
import { UploadDataAction } from "../redux/actions/UploadDataActions";
import { useSnackbar } from "notistack";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

function UploadData() {
  const { enqueueSnackbar } = useSnackbar();

  const [file, setFile] = useState();
  const [communityName, setCommunityName] = useState("");
  const [communitySize, setCommunitySize] = useState("");

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(UploadDataAction(communityName, communitySize, file)).then(() => {
      enqueueSnackbar("Uploaded Succesfully");
    });

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        console.log(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };

  //REDUX
  return (
    <Box sx={{ backgroundColor: "#7EB3E5", minHeight: "100vh" }}>
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
            Hello, Community Social Worker
          </Typography>
          <Typography
            component="h4"
            variant="h4"
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
            sx={{ mt: 3, width: { md: "400px" } }}
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
              id="communityName"
              name="communityName"
              autoComplete="communityName"
              label=""
              type="text"
              value={communityName}
              sx={{ backgroundColor: "#E8F0FE" }}
              onChange={(e) => setCommunityName(e.target.value)}
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
              label=""
              type="text"
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
