//Upload Data Request
import {
  UPLOAD_DATA_REQUEST,
  UPLOAD_DATA_SUCCESS,
  UPLOAD_DATA_FAILURE,
} from "../constants/UploadDataConstants";

//Upload Data Reducer
export const UploadDataReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_DATA_REQUEST:
      return { loading: true };
    case UPLOAD_DATA_SUCCESS:
      return { loading: false, upload_data: action.payload };
    case UPLOAD_DATA_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
