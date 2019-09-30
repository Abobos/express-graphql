const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const expressGraphQLPlayground = require("graphql-playground-middleware-express");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const models = require("./database/models");

const app = express();
const port = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
  formatError: error => {
    return error.message;
  }
});

server.applyMiddleware({ app, cors: true });

app.get("/", (req, res) =>
  res.end(`<h1>Welcom to the GraphQL Server</h1>
  <p>Visit <a href=http://localhost:${port}${server.graphqlPath}>
               <code>${server.graphqlPath}</code>
            </a>
  to start enjoying the nifty features of graphQL`)
);

app.get(
  "/playground",
  expressGraphQLPlayground.default({ endpoint: "/graphql" })
);
app.listen(port, () => {
  console.log(`Server ready @ http://localhost:${port}${server.graphqlPath}`);
});
