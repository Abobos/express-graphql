import { ApolloServer, PubSub } from "apollo-server-express";

import typeDefs from "../typeDefs";
import resolvers from "../resolvers";
import models from "../models";
import getUserAuth from "../resolvers/auth";

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req, connection }) {
    if (connection) {
      return { models, pubsub };
    } else {
      const authUser = getUserAuth(req);
      return { models, authUser, pubsub };
    }
  },
  formatError(error) {
    return error.message;
  }
});

export default server;
