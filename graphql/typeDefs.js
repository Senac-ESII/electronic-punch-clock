const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: String!
    email: String!
    username: String!
    role: String!
    token: String!
  }
  type Clock {
    id: ID!
    userId: ID!
    timeRegistered: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }
  type Query {
    getClocks: [Clock]
    getClocksById: [Clock]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createClock(date: String!, time: String!): Clock!
  }
`;
