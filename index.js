const { ApolloServer, gql, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const { MONGODB, PORT } = require("./config");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
  }
  type Mutation {
    register(username: String!, email: String!, password: String!): User
  }
  type Query {
    register: User!
  }
`;
const resolvers = {
  Mutation: {
    async register(_, { username, email, password }, context, info) {
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
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      return {
        ...res._doc,
        id: res._id,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
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
