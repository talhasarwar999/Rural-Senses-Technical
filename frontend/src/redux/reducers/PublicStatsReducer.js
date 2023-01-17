//Review Statics Constants
import {
  PUBLIC_STATS_REQUEST,
  PUBLIC_STATS_SUCCESS,
  PUBLIC_STATS_FAILURE,
} from "../constants/PublicStatsConstants";

// Review Statics Reducer
export const PublicStatsReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case PUBLIC_STATS_REQUEST:
          return { loading: true, publicstats: [] };

    case PUBLIC_STATS_SUCCESS:
      return { loading: false, publicstats: action.payload };

    case PUBLIC_STATS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
