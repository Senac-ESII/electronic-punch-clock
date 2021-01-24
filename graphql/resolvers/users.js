const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { SECRET_KEY } = require("../../config");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "3h" }
  );
}

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      let user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username already taken!", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Email already taken!", {
          errors: {
            username: "This Email is taken",
          },
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
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

    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found!";
        throw new UserInputError("User not found!", { errors });
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
