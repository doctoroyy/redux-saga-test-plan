import validator from "validator";

const validations = values => {
  const errors = {};
  if (!values.content) {
    errors.content = "Required";
  }
  if (!values.subject) {
    errors.subject = "Required";
  }
  if (!values.to) {
    errors.to = "Required";
  } else if (!validator.isEmail(values.to)) {
    errors.to = "Must be a email address";
  }
  return errors;
};

export default validations;
