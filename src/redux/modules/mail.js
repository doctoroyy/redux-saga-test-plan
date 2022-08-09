import { createAction, handleActions } from "redux-actions";

export const SEND_MAIL = "mail/send";
export const SEND_MAIL_LOADING = "mail/send_loading";
export const SEND_MAIL_SUCCESS = "mail/send_success";
export const SEND_MAIL_FAILED = "mail/send_failed";

export const CANCEL_SEND_MAIL = "mail/cancel_send";

export const sendMail = createAction(SEND_MAIL);
export const sendMailLoading = createAction(SEND_MAIL_LOADING);
export const sendMailSuccess = createAction(SEND_MAIL_SUCCESS);
export const sendMailFailed = createAction(SEND_MAIL_FAILED);

export const cancelSendMail = createAction(CANCEL_SEND_MAIL);

const initState = {
  formState: "idle"
};

const reducer = handleActions(
  {
    [SEND_MAIL]: state => ({
      ...state,
      formState: "loading"
    }),
    [SEND_MAIL_LOADING]: state => ({
      ...state,
      formState: "loading"
    }),
    [SEND_MAIL_SUCCESS]: state => ({
      ...state,
      formState: "idle"
    }),
    [SEND_MAIL_FAILED]: state => ({
      ...state,
      formState: "idle"
    })
  },
  initState
);

export default reducer;
