import { testSaga } from "redux-saga-test-plan";

import { sendMailLoading, sendMailSuccess } from "../redux/modules/mail";
import { countdown, sendMail } from "./mail";

describe("mail saga not cancel", () => {
  const action = {
    payload: {
      to: "test",
      subject: "test",
      content: "test"
    }
  };
  const chan = countdown();

  it("must success", () => {
    testSaga(sendMail, action)
      .next()
      .call(countdown)
      .next(chan)
      .put(sendMailLoading())
      .next()
      .take(chan)
      .finish()
      .cancelled()
      .next()
      .put(
        sendMailSuccess({
          icon: "smile",
          text: "Mail Sent"
        })
      )
      .next()
      .isDone();
  });
});

describe("mail saga do cancel", () => {
  const action = {
    payload: {
      to: "test",
      subject: "test",
      content: "test"
    }
  };
  const chan = countdown();

  it("must success", () => {
    testSaga(sendMail, action)
      .next()
      .call(countdown)
      .next(chan)
      .put(sendMailLoading())
      .next()
      .take(chan)
      .finish()
      .cancelled()
      .next(true)
      .put(
        sendMailSuccess({
          icon: "frown",
          text: "Cancelled"
        })
      )
      .next()
      .isDone();
  });
});
