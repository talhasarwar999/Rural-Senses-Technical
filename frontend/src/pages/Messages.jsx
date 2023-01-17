import React from "react";
//REDUX

import { Box, Grid, Typography } from "@mui/material";

function Messages() {
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
            Welcome to Messages
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
}

export default Messages;
