const Clock = require("../../models/clock");
const User = require("../../models/user");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    async getClocks(_, args, context) {
      const userData = checkAuth(context);
      let _id = userData.id;
      try {
        let user = await User.findOne({ _id });
        if (user.role !== "user") {
          try {
            const clocks = await Clock.find();
            return clocks;
          } catch (error) {
            throw new Error(error);
          }
        } else {
          throw new Error("You don't have permition to access this page.");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getClocksById(_, args, context) {
      const userData = checkAuth(context);
      let userId = userData.id;

      try {
        const clocks = await Clock.find({ userId });
        console.log(clocks);
        return clocks;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createClock(_, { date, time }, context) {
      const userData = checkAuth(context);
      if (userData.role !== "admin") {
        try {
          const newClock = new Clock({
            userId: userData.id,
            timeRegistered: date.concat(time),
          });
          const clock = await newClock.save();
          return clock;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        throw new Error("You don't have permition to access this page.");
      }
    },
  },
};
