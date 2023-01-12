//AXIOS
import axios from "axios";
//COMMON API
import { ApiServer } from "../../ApiConstant";
//JWT-DECODER
import jwt from "jwt-decode";
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
    var bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);
    const { data } = await axios.post(ApiServer + "/api/token/", bodyFormData);
    const token = data.access;
    console.log("tokenn", token);
    const user = jwt(token);
    console.log("userr", user.user_id);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    console.log("success", data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    localStorage.setItem("user", JSON.stringify(user.user_id));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response.status,
    });
    console.log(error.response.status);
  }
};

// Logout Actions

export const Logout = () => (dispatch) => {
  window.localStorage.clear();
  window.location.reload();
  dispatch({ type: USER_LOGOUT });
};
