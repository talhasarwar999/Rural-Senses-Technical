//Review Statics Constants
import {
  REVIEW_STATICS_REQUEST,
  REVIEW_STATICS_SUCCESS,
  REVIEW_STATICS_FAILURE,
} from "../constants/ReviewStatsConstants";

// Review Statics Reducer
export const ReviewStaticsReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case REVIEW_STATICS_REQUEST:
      return { loading: true, statics: [] };

    case REVIEW_STATICS_SUCCESS:
      return { loading: false, statics: action.payload };

    case REVIEW_STATICS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
