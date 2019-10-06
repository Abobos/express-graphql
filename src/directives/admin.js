import {
  SchemaDirectiveVisitor,
  AuthenticationError,
  ApolloError
} from "apollo-server-express";

class AdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve } = field;

    field.resolve = function(...args) {
      const { authUser } = args[2];

      if (!authUser) {
        throw new AuthenticationError("You are not authenticated");
      }

      if (authUser.role !== "ADMIN") {
        throw new ApolloError("You are not authorized");
      }

      return resolve.apply(this, args);
    };
  }
}

export default AdminDirective;
