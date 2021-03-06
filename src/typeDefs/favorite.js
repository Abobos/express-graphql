import { gql } from "apollo-server-express";

const favorite = gql`
  type Favorite {
    user: User!
    reply: Reply!
  }

  extend type Mutation {
    markAsFavorite(replyId: ID!): Favorite!
    unmarkAsFavorite(replyId: ID!): Boolean!
  }

  extend type Subscription {
    replyFavorited: Favorite!
    replyUnfavorited: Favorite!
  }
`;

export default favorite;
