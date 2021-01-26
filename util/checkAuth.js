const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const { SECRET_KEY } = require("../config");
/**
 * receivea an authorization token, check if is a valid token
 * @param {req} context  have all logged user attributes
 * @returns {object} - return the object user
 */
module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Espired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
