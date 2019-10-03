import { gql } from "apollo-server-express";

const root = gql`
  scalar DateTime
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`;

export default root;
