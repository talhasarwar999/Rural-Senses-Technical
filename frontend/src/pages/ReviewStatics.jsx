import React, { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { ReviewStaticsAction } from "../redux/actions/ReviewStaticsActions";

function ReviewStatics() {
  const dispatch = useDispatch();
  const reviewStatics = useSelector((state) => state.reviewStatics);
  const { statics } = reviewStatics;

  useEffect(() => {
    dispatch(ReviewStaticsAction());
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
            Welcome to Review Statics
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              p: 1,
              m: 1,
              borderRadius: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {statics ? (
              statics.map((data) => (
                <Card
                  sx={{
                    minWidth: 235,
                    m: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <CardContent>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      sx={{ fontSize: 14 }}
                    >
                      classification:
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: "Bold",
                          color: "black",
                        }}
                      >
                        {data.classifiation}
                      </Typography>
                    </Typography>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      sx={{ fontSize: 14 }}
                    >
                      Username:{" "}
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: "Bold",
                          color: "black",
                        }}
                      >
                        {data.username}
                      </Typography>
                    </Typography>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      sx={{ fontSize: 14 }}
                    >
                      Community Name:{" "}
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: "Bold",
                          color: "black",
                        }}
                      >
                        {data.community_name}
                      </Typography>
                    </Typography>
                    <Typography
                      color="text.secondary"
                      gutterBottom
                      sx={{ fontSize: 14 }}
                    >
                      Community Size:
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: "Bold",
                          color: "black",
                        }}
                      >
                        {data.community_size}
                      </Typography>
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : "No Data"}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default ReviewStatics;
