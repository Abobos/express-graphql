import express from "express";
import server from "./config/apollo";

const app = express();

server.applyMiddleware({ app, cors: true });

app.get("/", (req, res) =>
  res.end(
    `<h1>Welcome to the GraphQL Server</h1>
  <p>Visit <a href=http://localhost:${port}${server.graphqlPath}>
               <code>${server.graphqlPath}</code>
           </a>
  to start enjoying the nifty features of graphQL`
  )
);

export { server, app };
