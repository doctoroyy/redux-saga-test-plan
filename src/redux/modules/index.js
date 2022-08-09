import { combineReducers } from "redux";
import mail from "./mail";
import dialog from "./dialog";

const rootReducer = combineReducers({
  mail,
  dialog
});

export default rootReducer;
