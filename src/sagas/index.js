import { all, fork } from "redux-saga/effects";

import { watchSendMail } from "./mail";

export default function* rootSaga() {
  yield all([fork(watchSendMail)]);
}
