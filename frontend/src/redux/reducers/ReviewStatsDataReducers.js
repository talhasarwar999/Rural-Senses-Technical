//Review Statics Constants
import {
  REVIEW_STATS_DATA_REQUEST,
  REVIEW_STATS_DATA_SUCCESS,
  REVIEW_STATS_DATA_FAILURE,
} from "../constants/ReviewStatsDataConstants";

// Review Statics Reducer
export const ReviewStatsDataReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case REVIEW_STATS_DATA_REQUEST:
      return { loading: true, statsdata: [] };

    case REVIEW_STATS_DATA_SUCCESS:
      return { loading: false, statsdata: action.payload };

    case REVIEW_STATS_DATA_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
