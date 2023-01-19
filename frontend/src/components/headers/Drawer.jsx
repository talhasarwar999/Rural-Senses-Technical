import React, { useState } from "react";
//Material UI
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
//Material UI Icon
import MenuIcon from "@mui/icons-material/Menu";
import UploadIcon from "@mui/icons-material/Upload";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import MessageIcon from "@mui/icons-material/Message";
//Snackbar
import { useSnackbar } from "notistack";
//Redux
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/actions/LoginActions";
//React-Router-Dom
import { Link } from "react-router-dom";
//Cookie
import GetCookie from "../../hooks/getCookie";

//Material UI Style
const StyledListItemText = styled(ListItemText)({
  color: "white",
  fontWeight: "bold",
});

const DrawerComp = () => {
  //State
  const [openDrawer, setOpenDrawer] = useState(false);
  const [admin] = useState(GetCookie("user") === '"Admin"' ? true : null);
  const [official] = useState(
    GetCookie("user") === '"PublicOfficial"' ? true : null
  );

  //Snackbar
  const { enqueueSnackbar } = useSnackbar();

  //Redux
  const dispatch = useDispatch();
  const logoutHandler = () => {
    enqueueSnackbar("Logged Out Successfully", {
      variant: "error",
    });
    dispatch(Logout());
  };

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List
          sx={{
            color: "white",
            width: { xs: "170px", sm: "150px" },
            p: 4,
            backgroundColor: "#5093D6",
            height: "100%",
          }}
        >
          <Typography
            component="h5"
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              textDecoration: "underline",
            }}
          >
            Rural Senses
          </Typography>
          <Divider sx={{ mt: 2, backgroundColor: "white" }} />
          <ListItemButton>
            <ListItemIcon>
              <StyledListItemText></StyledListItemText>
            </ListItemIcon>
          </ListItemButton>

          {admin || official ? null : (
            <ListItemButton onClick={() => setOpenDrawer(false)}>
              <ListItemIcon>
                <Link
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  to="/upload"
                >
                  <UploadIcon sx={{ color: "white", mr: 2 }} />{" "}
                  <StyledListItemText>Upload</StyledListItemText>
                </Link>
              </ListItemIcon>
            </ListItemButton>
          )}
          {admin || official ? null : (
            <ListItemButton onClick={() => setOpenDrawer(false)}>
              <ListItemIcon>
                <Link
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  to="/statistics"
                >
                  <QueryStatsIcon sx={{ color: "white", mr: 2 }} />{" "}
                  <StyledListItemText>Stats</StyledListItemText>
                </Link>
              </ListItemIcon>
            </ListItemButton>
          )}
          {admin || official ? null : (
            <ListItemButton>
              <ListItemIcon onClick={() => setOpenDrawer(false)}>
                <Link
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  to="/message"
                >
                  <MessageIcon sx={{ color: "white", mr: 2 }} />{" "}
                  <StyledListItemText>Messages</StyledListItemText>
                </Link>
              </ListItemIcon>
            </ListItemButton>
          )}
          <Tooltip title="Click here for logout">
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                mt: "30px", ml: 2
              }}
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </Tooltip>
        </List>
      </Drawer>
      <IconButton
        sx={{ marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon style={{ color: "#E89121" }} />
      </IconButton>
    </React.Fragment>
  );
};
export default DrawerComp;
