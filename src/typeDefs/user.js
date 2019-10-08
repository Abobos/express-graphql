import { gql } from "apollo-server-express";

const user = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: Role!
    avatar: String
    threads(perPage: Int, page: Int): [Thread]!
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
    me: User! @auth
    signIn(email: String!, password: String!): Token!
    user(username: String!): User!
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    updateUser(username: String!, email: String!): User! @auth
    changePassword(currentPassword: String!, newPassword: String!): User! @auth
    uploadAvatar(avatar: Upload!): User! @auth
  }
`;

export default user;
