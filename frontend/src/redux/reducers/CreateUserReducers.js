// Create User Constant
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from "../constants/CreateUserConstants";

// Create User Reducer
export const CreateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { loading: true };
    case CREATE_USER_SUCCESS:
      return { loading: false, createuser: action.payload };
    case CREATE_USER_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
