const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { SECRET_KEY } = require("../../config");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
/**
 * Create a new jwt token
 * @param {Object} user
 * @returns {token} - return a new jwt token
 */
function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    SECRET_KEY,
    { expiresIn: "3h" }
  );
}

module.exports = {
  Mutation: {
    /**
     * Create a new user in database, hash the password and generate a new jwt token
     * @param {String} name
     * @param {String} email
     * @param {String} password
     * @param {Request} context have all logged user attributes
     * @returns {object} - return the object User and the jwt token
     */
    async register(
      _,
      { registerInput: { name, email, password } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(name, email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      let user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Email already in use!", {
          errors: {
            email: "Email already in use",
          },
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        email,
        password,
        role: "user",
      });

      const res = await newUser.save();

      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    /**
     * create a new jwt token that is used to validate login, compare the password with hash database password and validate inputs
     * @param {String} email
     * @param {String} password
     * @returns {token} - returns a user and a new jwt token
     */
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email });
      if (!user) {
        errors.general = "Email not found!";
        throw new UserInputError("Email not found!", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials!";
        throw new UserInputError("Wrong credentials!", { errors });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
