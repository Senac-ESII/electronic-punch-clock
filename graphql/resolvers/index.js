const usersResolvers = require("./users");
const clocksResolvers = require("./clocks");
/**
 * export resolvers functions
 */
module.exports = {
  Query: {
    ...clocksResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...clocksResolvers.Mutation,
  },
};
