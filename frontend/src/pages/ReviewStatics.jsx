import React from "react";
//Material UI
import { Box, Grid, Typography } from "@mui/material";
//Component
import ReviewStaticsTable from "../components/table/ReviewStaticsTable";

function ReviewStatics() {
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
            component="h5"
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: { xs: 18, sm: 28 },
            }}
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
              fontSize: { xs: 18, sm: 28 },
            }}
          >
            Welcome to Review Statics
          </Typography>
          <Box
            sx={{
              width: { xs: "90%", sm: "80%" },
              mb: 4,
            }}
          >
            <ReviewStaticsTable />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default ReviewStatics;
