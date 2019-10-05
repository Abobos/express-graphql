import { gql } from "apollo-server-express";

const user = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: Role!
    avatar: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum Role {
    ADMIN
    USER
  }

  type Token {
    token: String!
  }

  extend type Query {
    me: User!
    signIn(email: String!, password: String!): Token!
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    updateUser(username: String!, email: String!): User!
    changePassword(currentPassword: String!, newPassword: String!): User!
  }
`;

export default user;
