const { gql } = require("apollo-server");
/**
 * gql schemas are all the resources and returns that we can access in the api
 */
module.exports = gql`
  type User {
    id: String!
    email: String!
    name: String!
    role: String!
    token: String!
  }
  type Clock {
    id: ID!
    userId: ID!
    timeRegistered: String!
  }
  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }
  type Query {
    getClocks: [Clock]
    getClocksById: [Clock]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createClock(date: String!, time: String!): Clock!
  }
`;
