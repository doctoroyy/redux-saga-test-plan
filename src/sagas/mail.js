/* global window */

import { eventChannel, END } from "redux-saga";
import { put, call, take, race, cancelled, delay } from "redux-saga/effects";

import {
  SEND_MAIL,
  sendMailLoading,
  sendMailSuccess,
  sendMailFailed,
  CANCEL_SEND_MAIL
} from "../redux/modules/mail";

const countdown = () => {
  let secs = 3;
  return eventChannel(listener => {
    const iv = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        listener(secs);
      } else {
        listener(END);
        clearInterval(iv);
      }
    }, 1000);
    return () => {
      clearInterval(iv);
    };
  });
};

function* sendMail(action) {
  const timer = yield call(countdown);
  yield put(sendMailLoading());
  try {
    while (true) {
      yield take(timer);
    }
  } catch (err) {
    yield put(sendMailFailed(err));
  } finally {
    if (!(yield cancelled())) {
      yield put(
        sendMailSuccess({
          icon: "smile",
          text: "Mail Sent"
        })
      );
      window.ts("#modal").modal("show");
    } else {
      yield put(
        sendMailSuccess({
          icon: "frown",
          text: "Cancelled"
        })
      );
      window.ts("#modal").modal("show");
    }
    timer.close();
  }
}

function* watchSendMail() {
  try {
    while (true) {
      const action = yield take(SEND_MAIL);
      yield race([call(sendMail, action), take(CANCEL_SEND_MAIL)]);
    }
  } finally {
    console.log("watchSendMail terminated");
  }
}

export { countdown, sendMail, watchSendMail };
