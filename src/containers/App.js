import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { sendMail, cancelSendMail } from "../redux/modules/mail";
import { promiseListener } from "../redux/store";
import Form from "../components/Form";

class App extends PureComponent {
  render() {
    const { sendMail, cancelSendMail, mail, dialog } = this.props;
    return (
      <div>
        <div className="ts very narrow container">
          <br />
          <div className="ts card">
            <div className="content">
              <div className="header">Write Mail</div>
              <div className="description">
                <Form
                  submitting={mail.formState === "loading"}
                  onSubmit={sendMail}
                  onCancel={cancelSendMail}
                />
              </div>
            </div>
          </div>
        </div>
        {dialog.text && (
          <div className="ts modals inverted dimmer">
            <dialog id="modal" className="ts closable mini modal">
              <div className="ts icon header">
                <i className={`${dialog.icon} icon`} /> {dialog.text}
              </div>
            </dialog>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mail: state.mail,
    dialog: state.dialog
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      sendMail,
      cancelSendMail
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
