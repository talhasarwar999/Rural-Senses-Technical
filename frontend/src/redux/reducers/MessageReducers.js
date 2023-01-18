//Message Request
import {
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_FAILURE,
  GET_MESSAGE_REQUEST,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
} from "../constants/MessageConstants";

//Message Reducer
export const MessageReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_REQUEST:
      return { loading: true };
    case MESSAGE_SUCCESS:
      return { loading: false, message: action.payload };
    case MESSAGE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//Get Message Reducer

export const GetMessageReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_MESSAGE_REQUEST:
      return { loading: true, getmessage: [] };

    case GET_MESSAGE_SUCCESS:
      return { loading: false, getmessage: action.payload };

    case GET_MESSAGE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
