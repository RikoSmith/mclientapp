import { combineReducers } from "redux";
import GetUser from "./GetUser";

export default combineReducers({
  user: GetUser
});
