import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form as FinalForm, Field } from "react-final-form";

import validations from "./validations";

class Form extends PureComponent {
  static propTypes = {
    submitting: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
  };
  handleUndoClick = e => {
    e.preventDefault();
    this.props.onCancel();
  };
  render() {
    const { submitting, onSubmit } = this.props;
    return (
      <FinalForm
        onSubmit={values => onSubmit(values)}
        validate={validations}
        render={({ handleSubmit }) => (
          <form className="ts form" onSubmit={handleSubmit}>
            <Field name="to">
              {({ input, meta: { error, touched } }) => (
                <div className={`field ${error && touched ? "error" : ""}`}>
                  <input
                    {...input}
                    type="text"
                    placeholder="To"
                    disabled={submitting}
                  />
                </div>
              )}
            </Field>
            <Field name="subject">
              {({ input, meta: { error, touched } }) => (
                <div className={`field ${error && touched ? "error" : ""}`}>
                  <input
                    {...input}
                    type="text"
                    placeholder="Subject"
                    disabled={submitting}
                  />
                </div>
              )}
            </Field>
            <Field name="content">
              {({ input, meta: { error, touched } }) => (
                <div className={`field ${error && touched ? "error" : ""}`}>
                  <textarea
                    {...input}
                    rows="8"
                    placeholder="Say something"
                    disabled={submitting}
                  />
                </div>
              )}
            </Field>
            <div className="ts relaxed separated buttons">
              <button
                id="send"
                type="submit"
                className={`ts primary ${submitting ? "loading" : ""} button`}
                disabled={submitting}
              >
                Send
              </button>
              {submitting && (
                <button
                  id="undo"
                  className={`ts link button`}
                  onClick={this.handleUndoClick}
                >
                  Undo
                </button>
              )}
            </div>
          </form>
        )}
      />
    );
  }
}

export default Form;
