//AXIOS
import axios from "axios";
//COMMON API
import { ApiServer } from "../../ApiConstant";
//LOGIN CONSTANTS
import {
  UPLOAD_DATA_REQUEST,
  UPLOAD_DATA_SUCCESS,
  UPLOAD_DATA_FAILURE,
} from "../constants/UploadDataConstants";

export const UploadDataAction =
  (community_name, community_size, csv_file) => async (dispatch) => {
    try {
      dispatch({
        type: UPLOAD_DATA_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo"))["access_token"]
          }`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        ApiServer + "/upload-data-by-community",
        {
          community_name: community_name,
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
        payload: error.detail,
      });
    }
  };
