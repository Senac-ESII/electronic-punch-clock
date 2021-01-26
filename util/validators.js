/**
 * Validate register inputs: checks username, email or password must not be empty and email has a especific format.
 * @param {String} username
 * @param {String} email
 * @param {String} password
 * @returns {object} - return the errors if they occur
 */
module.exports.validateRegisterInput = (username, email, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty!";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty!";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-.\w]*[0-9a-zA-Z\.])+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address!";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

/**
 * Validate login inputs: email and password, checking if they are not empty.
 * @param {String} email
 * @param {String} password
 * @returns {object} - return the errors if they occur
 */
module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty!";
  }
  if (password === "") {
    errors.password = "Password must not be empty!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
