const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const expressGraphQLPlayground = require("graphql-playground-middleware-express");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const models = require("./models");
const getUserAuth = require("./resolvers/auth");

const app = express();
const port = 4000;

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
  res.send(`<h1>Welcome to the GraphQL Server</h1>
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
