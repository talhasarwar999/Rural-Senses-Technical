//AXIOS
import axios from "axios";
//Cookie
import GetCookie from "../../hooks/getCookie";
//COMMON API
import { ApiServer } from "../../ApiConstant";
//Review Statics CONSTANTS
import {
  REVIEW_STATICS_REQUEST,
  REVIEW_STATICS_SUCCESS,
  REVIEW_STATICS_FAILURE,
} from "../constants/ReviewStatsConstants";

//Review Statics Action
export const ReviewStaticsAction = () => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_STATICS_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(GetCookie("userInfo"))["access_token"]
        }`,
      },
    };
    const { data } = await axios.get(
      ApiServer + "/api/review-statistics-by-community",
      config
    );
    dispatch({
      type: REVIEW_STATICS_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: REVIEW_STATICS_FAILURE,
      payload: error.response.data.msg,
    });
    console.log(error.response.data.msg);
  }
};
