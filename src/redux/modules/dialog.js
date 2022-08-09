import { SEND_MAIL_SUCCESS } from "./mail";

const initState = {
  icon: "",
  text: ""
};

export default (state = initState, action) => {
  switch (action.type) {
    case SEND_MAIL_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
