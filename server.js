import http from "http";
import { server, app } from "./src/app";

const port = 4000;

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`Server ready @ http://localhost:${port}${server.graphqlPath}`);
  console.log(
    `Subscriptions ready @ ws://localhost:${port}${server.subscriptionsPath}`
  );
});
