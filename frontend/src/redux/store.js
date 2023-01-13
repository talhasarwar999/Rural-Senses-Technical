//REDUX
import { createStore, applyMiddleware, combineReducers } from "redux";
//REDUX-THUNK
import thunk from "redux-thunk";
//REDUX-DEVTOOLS-EXTENSION
import { composeWithDevTools } from "redux-devtools-extension";
//REDUCERS
import { userLoginReducer } from "./reducers/LoginReducers";
import { CreateUserReducer } from "./reducers/CreateUserReducers";
import { UploadDataReducer } from "./reducers/UploadDataReducers";
import { ReviewStaticsReducer } from "./reducers/ReviewStaticsReducers";

//CALLING REDUCERS
const reducer = combineReducers({
  userLogin: userLoginReducer,
  createUser: CreateUserReducer,
  uploadData: UploadDataReducer,
  reviewStatics: ReviewStaticsReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
