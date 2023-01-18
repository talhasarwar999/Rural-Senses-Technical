//AXIOS
import axios from "axios";
//COMMON API
import { ApiServer } from "../../ApiConstant";
//Cookie
import GetCookie from "../../hooks/getCookie";
//LOGIN CONSTANTS
import {
  UPLOAD_DATA_REQUEST,
  UPLOAD_DATA_SUCCESS,
  UPLOAD_DATA_FAILURE,
} from "../constants/UploadDataConstants";

//Upload Data Action
export const UploadDataAction =
  (community, community_size, csv_file) => async (dispatch) => {
    try {
      dispatch({
        type: UPLOAD_DATA_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(GetCookie("userInfo"))["access_token"]
          }`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        ApiServer + "/api/upload-data-by-community",
        {
          community: community,
          community_size: community_size,
          csv_file: csv_file,
        },
        config
      );

      dispatch({
        type: UPLOAD_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPLOAD_DATA_FAILURE,
        payload: error.response.data.msg,
      });
      console.log(error.response.data.msg);
    }
  };
