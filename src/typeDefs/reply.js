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
    createReply(threadId: ID!, content: String!): Reply! @auth
    markReplyAsBestAnswer(id: ID!): Reply! @auth
    unmarkReplyAsBestAnswer(id: ID!): Reply! @auth
    updateReply(id: ID!, content: String!): Reply! @auth
    deleteReply(id: ID!): Boolean! @auth
  }

  extend type Subscription {
    replyAdded: Reply!
    replyMarkedAsBestAnswer: Reply!
    replyUnmarkedAsBestAnswer: Reply!
  }
`;

export default reply;
