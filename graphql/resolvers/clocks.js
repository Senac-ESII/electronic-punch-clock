const { AuthenticationError, UserInputError } = require("apollo-server");

const Clock = require("../../models/clock");
const User = require("../../models/user");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    async getClocks(_, args, context) {
      const { id } = checkAuth(context);
      try {
        const user = await User.findOne({ id });
        if (user.role !== "user") {
          try {
            const clocks = await Clock.find();
            return clocks;
          } catch (error) {
            throw new Error(error);
          }
        } else {
          throw new Error("Você não tem permissão para acessar essa página");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getClocksById(_, args, context) {
      const { id } = checkAuth(context);

      try {
        const clocks = await Clock.find({ id });
        return clocks;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createClock(_, { date, time }, context) {
      const userData = checkAuth(context);
      const newClock = new Clock({
        userId: userData.id,
        timeRegistered: date.concat(time),
      });
      const clock = await newClock.save();
      return clock;
    },
  },
};
