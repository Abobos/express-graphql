import { gql } from "apollo-server-express";

const thread = gql`
  type Thread {
    id: ID!
    title: String!
    slug: String!
    content: String!
    creator: User!
    channel: Channel!
    # replies(perPage: Int, after: String): ReplyConnection!
    replies: Reply!
    status: ThreadStatus!
    isLocked: Boolean!
    lastRepliedAt: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ReplyConnection {
    edges: [Reply!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    endCursor: String
    hasMore: Boolean!
  }

  enum ThreadStatus {
    UNSOLVED
    SOLVED
  }

  extend type Mutation {
    createThread(title: String!, content: String!, channelId: ID!): Thread!
      @auth
    updateThread(id: ID!, title: String!, content: String!): Thread! @auth
    lockThread(id: ID!): Thread! @admin
    unlockThread(id: ID!): Thread! @admin
  }

  extend type Query {
    thread(id: ID!): Thread
    threads(
      channelSlug: String
      status: ThreadStatus
      perPage: Int
      page: Int
    ): [Thread]!
    threadsByMe(perPage: Int, page: Int): [Thread]! @auth
  }
`;

export default thread;
