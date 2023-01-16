import React from "react";
//Material UI
import { Box, Grid, Stack, Typography } from "@mui/material";
//Component
import ReviewStaticsTable from "../components/table/ReviewStaticsTable";
import { PieChart } from "../components/chart/PieChart";

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
          <Stack
            spacing={3}
            sx={{
              width: { xs: "90%", sm: "100%" },
              mb: 4,
              display: "flex",
              flexDirection: {xs:"column",md:"row"},
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "40%",
                mb:3
              }}
            >
              <PieChart />
            </Box>
            <ReviewStaticsTable />
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
}

export default ReviewStatics;
