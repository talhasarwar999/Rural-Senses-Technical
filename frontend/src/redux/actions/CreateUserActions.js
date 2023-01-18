//AXIOS
import axios from "axios";
//Cookie
import GetCookie from "../../hooks/getCookie";
//COMMON API
import { ApiServer } from "../../ApiConstant";
//Create User CONSTANTS
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from "../constants/CreateUserConstants";

//Create User Action
export const CreateUserAction =
  (username, password, role) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_USER_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(GetCookie("userInfo"))["access_token"]
          }`,
        },
      };

      const { data } = await axios.post(
        ApiServer + "/api/add-user-by-admin",
        {
          username: username,
          password: password,
          role: role,
        },
        config
      );

      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILURE,
        payload: error.response.data.msg,
      });
      console.log(error.response.data.msg);
    }
  };
