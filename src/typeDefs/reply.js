import { gql } from "apollo-server-express";

const reply = gql`
  type Reply {
    id: ID!
    content: String!
    user: User!
    isBestAnswer: Boolean!
    favorites: [Favorite]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Mutation {
    createReply(threadId: ID!, content: String!): Reply!
    markReplyAsBestAnswer(id: ID!): Reply!
    unmarkReplyAsBestAnswer(id: ID!): Reply!
    updateReply(id: ID!, content: String!): Reply!
    deleteReply(id: ID!): Boolean!
  }

  extend type Subscription {
    replyAdded: Reply!
    replyMarkedAsBestAnswer: Reply!
    replyUnmarkedAsBestAnswer: Reply!
  }
`;

export default reply;
