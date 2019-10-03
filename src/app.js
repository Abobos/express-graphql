import express from "express";
import { ApolloServer } from "apollo-server-express";
import expressGraphQLPlayground from "graphql-playground-middleware-express";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import models from "./models";
import getUserAuth from "./resolvers/auth";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    const authUser = getUserAuth(req);
    return { models, authUser };
  },
  formatError: error => {
    return error.message;
  }
});

server.applyMiddleware({ app, cors: true });

app.get("/", (req, res) =>
  res.end(`<h1>Welcome to the GraphQL Server</h1>
  <p>Visit <a href=http://localhost:${port}${server.graphqlPath}>
               <code>${server.graphqlPath}</code>
           </a>
  to start enjoying the nifty features of graphQL`)
);

app.get("/playground", expressGraphQLPlayground({ endpoint: "/graphql" }));

export { server, app };
