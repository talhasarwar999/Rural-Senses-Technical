//AXIOS
import axios from "axios";
//Cookie
import GetCookie from "../../hooks/getCookie";
//COMMON API
import { ApiServer } from "../../ApiConstant";
//Review Statics CONSTANTS
import {
  PUBLIC_STATS_REQUEST,
  PUBLIC_STATS_SUCCESS,
  PUBLIC_STATS_FAILURE,
} from "../constants/PublicStatsConstants";

//Review Statics Action
export const PublicStatsAction = () => async (dispatch) => {
  try {
    dispatch({ type: PUBLIC_STATS_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(GetCookie("userInfo"))["access_token"]
        }`,
      },
    };
    const { data } = await axios.get(
      ApiServer + "/api/public-official-review",
      config
    );
    dispatch({
      type: PUBLIC_STATS_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: PUBLIC_STATS_FAILURE,
      payload: error.response.data.msg,
    });
    console.log(error.response.data.msg);
  }
};
