import { combineReducers } from "redux";
import postFetchReducer from "./fetchReducer";

const reducers = combineReducers({
  postFetch: postFetchReducer,
});

export default reducers;
