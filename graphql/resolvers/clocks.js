const Clock = require("../../models/clock");
const User = require("../../models/user");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    /**
     * searches the database and returns all clocks
     * @param {Request} context have all logged user attributes
     * @returns {object} - a list with all Clock objects in the database
     */
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
    /**
     * searches the database and returns all clocks that contain the same id
     * @param {Request} context have all logged user attributes
     * @returns {object} - a list of Clock objects which user id is equal to id of logged user
     */
    async getClocksById(_, args, context) {
      const userData = checkAuth(context);
      let userId = userData.id;

      try {
        const clocks = await Clock.find({ userId });
        return clocks;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    /**
     * create a new object timeRegister in the database with userId as a reference
     * @param {String} date
     * @param {String} time
     * @param {Request} context have all logged user attributes
     * @returns {object} - Clock object
     */
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
