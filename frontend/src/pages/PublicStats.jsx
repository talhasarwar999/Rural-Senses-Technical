import React, { useEffect } from "react";
//Material UI
import { Box, Grid, Stack, Typography } from "@mui/material";
//Component
import StackBarChart from "../components/chart/StackBarChart";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { PublicStatsAction } from "../redux/actions/PublicStatsActions";
import ReviewStatsDataTable from "../components/table/ReviewStatsDataTable";

function PublicStats() {
  //REDUX
  const dispatch = useDispatch();
  const publicStats = useSelector((state) => state.publicStats);
  const { publicstats } = publicStats;

  useEffect(() => {
    dispatch(PublicStatsAction());
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
            Welcome to Review Stats
          </Typography>
          <Stack
            spacing={3}
            sx={{
              width: { xs: "90%", sm: "100%" },
              mb: 4,
              display: "flex",
              flexDirection: { xs: "column" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "80%",
                mb: 3,
              }}
            >
              {publicstats ? (
                <StackBarChart
                  xLabels={publicstats.communities}
                  family={publicstats?.data?.FAMILY}
                  health={publicstats?.data?.HEALTH}
                  unknown={publicstats?.data?.UNKNOWN}
                />
              ) : (
                <></>
              )}
            </Box>
            <Typography variant="h3" component="h3" sx={{color:"white", fontSize:{xs:12,sm:52}}}> Table Of Community Stats</Typography>
            <Box sx={{width:'80%'}}>
              <ReviewStatsDataTable />
            </Box>
          </Stack>
        </Box>
      </Grid>
    </Box>
  );
}

export default PublicStats;
