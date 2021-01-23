const usersResolvers = require("./users");
const clocksResolvers = require("./clocks");

module.exports = {
  Query: {
    ...clocksResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...clocksResolvers.Mutation,
  },
};
