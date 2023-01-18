//AXIOS
import axios from "axios";
//Cookie
import GetCookie from "../../hooks/getCookie";
//COMMON API
import { ApiServer } from "../../ApiConstant";
//Review Stats Data CONSTANTS
import {
  REVIEW_STATS_DATA_REQUEST,
  REVIEW_STATS_DATA_SUCCESS,
  REVIEW_STATS_DATA_FAILURE,
} from "../constants/ReviewStatsDataConstants";

//Review Stats Data Action
export const ReviewStatsDataAction = () => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_STATS_DATA_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(GetCookie("userInfo"))["access_token"]
        }`,
      },
    };
    const { data } = await axios.get(
      ApiServer + "/api/get-communities",
      config
    );
    dispatch({
      type: REVIEW_STATS_DATA_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: REVIEW_STATS_DATA_FAILURE,
      payload: error.response.data.msg,
    });
    console.log(error.response.data.msg);
  }
};
