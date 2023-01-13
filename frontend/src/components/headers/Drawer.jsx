import React, { useState } from "react";
//Material UI
import {
  Button,
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
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/actions/LoginActions";
//Material UI Style
const StyledListItemText = styled(ListItemText)({
  color: "white",
  fontWeight: "bold",
});
const DrawerComp = () => {
  //State
  const [openDrawer, setOpenDrawer] = useState(false);
    const dispatch = useDispatch();
    const logoutHandler = () => {
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
          {/* {pages.map((page, index) => ( */}
          <Typography
            component="h1"
            variant="h4"
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
          <ListItemButton>
            <ListItemIcon>
              <StyledListItemText></StyledListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <StyledListItemText>upload</StyledListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <StyledListItemText>Statics</StyledListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <StyledListItemText>Messages</StyledListItemText>
            </ListItemIcon>
          </ListItemButton>
          {/* ))} */}
          <Tooltip title="Click here for logout">
            <Button
              variant="outlined"
              color="inherit"
              sx={{ mt: "30px" }}
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
