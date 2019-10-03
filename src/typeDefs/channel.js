import { gql } from "apollo-server-express";

const channel = gql`
  type Channel {
    id: ID!
    name: String!
    slug: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    channels: [Channel!]!
  }
`;

export default channel;
