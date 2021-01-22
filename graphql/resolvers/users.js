const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password } },
      context,
      info
    ) {
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username already taken!", {
          errors: {
            username: "This username ir taken",
          },
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password,
        role: 0,
      });

      const res = await newUser.save();
      return {
        ...res._doc,
        id: res._id,
      };
    },
  },
};
