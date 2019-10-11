import { ApolloServer, PubSub } from "apollo-server-express";

import typeDefs from "../typeDefs";
import resolvers from "../resolvers";
import models from "../models";
import getUserAuth from "../resolvers/auth";
import { AuthDirective, AdminDirective } from "../directives";
import { userLoader, channelLoader, repliesLoader } from "../loaders";

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective,
    admin: AdminDirective
  },
  context({ req, connection }) {
    if (connection) {
      return { models, pubsub };
    } else {
      const authUser = getUserAuth(req);
      return {
        models,
        authUser,
        pubsub,
        loaders: {
          user: userLoader(),
          channel: channelLoader(),
          replies: repliesLoader()
        }
      };
    }
  },
  formatError(error) {
    return error.message;
  }
});

export default server;
