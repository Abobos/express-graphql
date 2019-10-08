import {
  SchemaDirectiveVisitor,
  AuthenticationError
} from "apollo-server-express";

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = function(...args) {
      const { authUser } = args[2];

      if (!authUser) throw new AuthenticationError("You are not authenticated");

      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
