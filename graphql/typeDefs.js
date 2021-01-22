const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    role: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }
  type Query {
    getUsers: [User]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
