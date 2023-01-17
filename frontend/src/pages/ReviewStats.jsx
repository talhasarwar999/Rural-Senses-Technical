import React, { useEffect } from "react";
//Material UI
import { Box, Grid, Stack, Typography } from "@mui/material";
//Component
import PieChart from "../components/chart/PieChart";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { ReviewStaticsAction } from "../redux/actions/ReviewStatsActions";

function ReviewStats() {
  //REDUX
  const dispatch = useDispatch();
  const reviewStatics = useSelector((state) => state.reviewStatics);
  const { statics } = reviewStatics;

  useEffect(() => {
    dispatch(ReviewStaticsAction());
    // console.log("Review", Object(statics).keys())
  }, [dispatch]);
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
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "40%",
                mb: 3,
              }}
            >
              {statics ? (
                <PieChart
                  key={Object.keys(statics)}
                  xLabels={Object.keys(statics)}
                  values={Object.values(statics)}
                />
              ) : (
                <></>
              )}
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
}

export default ReviewStats;
