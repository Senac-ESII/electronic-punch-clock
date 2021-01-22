const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB, PORT } = require("./config");

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;
const resolvers = {
  Query: {
    sayHi: () => "Testing types!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoDB Connected!");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
