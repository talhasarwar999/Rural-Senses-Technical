//AXIOS
import axios from "axios";
//Cookie
import SetCookie from "../../hooks/setCookie";
import RemoveCookie from "../../hooks/removeCookie";
//COMMON API
import { ApiServer } from "../../ApiConstant";
//LOGIN CONSTANTS
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from "../constants/LoginConstants";

//LOGIN ACTIONS
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    RemoveCookie("userInfo");
    RemoveCookie("user");
    RemoveCookie("error");

    var bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);
    const { data } = await axios.post(
      ApiServer + "/api/user-signin",
      bodyFormData,
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    SetCookie("userInfo", JSON.stringify(data));
    SetCookie("user", JSON.stringify(data.role));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response.status,
    });
    console.log(error.response.status);
    SetCookie("error", JSON.stringify(error.response.status));
  }
};

// Logout Actions

export const Logout = () => (dispatch) => {
  RemoveCookie("userInfo");
  RemoveCookie("user");
  window.location.reload();
  dispatch({ type: USER_LOGOUT });
};
