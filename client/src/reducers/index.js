import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import productsReducer from "./productsReducer"; 

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
