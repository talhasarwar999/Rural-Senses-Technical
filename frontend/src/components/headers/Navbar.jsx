import React, { useState } from "react";
//material UI
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
//MATERIAL UI ICON
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
//Components
import DrawerComp from "./Drawer";
//React-Router-Dom
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/actions/LoginActions";
//Material UI Custom Styles
const StyledTab = styled(Tab)({
  color: "white",
});
//Dummy Data
const tabs = [
  {
    label: "upload",
    path: "/upload",
  },
  {
    label: "Statics",
    path: "/statics",
  },

  {
    label: "Messages",
    path: "/message",
  },
];
//Header function
const Header = () => {
  //State
  const [value, setValue] = useState();
  const [admin] = useState(
    localStorage.getItem("user") === '"Admin"' ? true : null
  );
  //Theme Constants
  const theme = useTheme();
  //Material UI Responsive Views
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  //REDUX
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(Logout());
  };
  return (
    <React.Fragment>
      <AppBar sx={{ position: "sticky" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <QuestionAnswerIcon />
          </IconButton>
          <Typography
            component="div"
            style={{ fontWeight: 700 }}
            sx={{ flexGrow: 1, typography: { md: "h6", xs: "caption" } }}
          >
            Rural Senses
          </Typography>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                TabIndicatorProps={{ style: { background: "white" } }}
                sx={{ marginLeft: "auto", mr: 3 }}
                textColor="white"
                indicatorColor="secondary"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                {admin
                  ? null
                  : tabs.map(({ label, path }) => (
                      <StyledTab
                        key={label}
                        label={label}
                        component={Link}
                        to={path}
                      />
                    ))}
              </Tabs>
              <Button
                variant="outlined"
                color="inherit"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default Header;
