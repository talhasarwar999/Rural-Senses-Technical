//AXIOS
import axios from "axios";
//COMMON API
import { ApiServer } from "../../ApiConstant";
//Cookie
import GetCookie from "../../hooks/getCookie";
//LOGIN CONSTANTS
import {
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_FAILURE,
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
} from "../constants/MessageConstants";

//Message Action
export const MessageAction = (community) => async (dispatch) => {
  try {
    dispatch({
      type: MESSAGE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(GetCookie("userInfo"))["access_token"]
        }`,
      },
    };

    const { data } = await axios.post(
      ApiServer + "/api/send-message-by-publicofficial",
      {
        community: community,
        message: `Please revise the data for community ${community}`,
      },
      config
    );

    dispatch({
      type: MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_FAILURE,
      payload: error.response.data.msg,
    });
    console.log(error.response.data.msg);
  }
};

//Get Message Action

export const GetMessageAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_MESSAGE_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(GetCookie("userInfo"))["access_token"]
        }`,
      },
    };
    const { data } = await axios.get(
      ApiServer + "/api/review-message-by-community",
      config
    );
    dispatch({
      type: GET_MESSAGE_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_MESSAGE_FAILURE,
      payload: error.response.data.msg,
    });
    console.log(error.response.data.msg);
  }
};
