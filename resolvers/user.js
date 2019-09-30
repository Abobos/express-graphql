const { ApolloError } = require("apollo-server-express");
const tokenHandler = require("../utils/tokenHandler");

module.exports = {
  Mutation: {
    async signUp(parent, args, { models }) {
      const { email } = args;
      const userExists = await models.User.findOne({ where: { email } });

      if (userExists) {
        throw new ApolloError("Email already in use");
      }

      const user = await models.User.create(args);

      const userDetails = { id: user.id, email: user.email, role: user.role };

      return { token: tokenHandler.createToken(userDetails) };
    }
  }
};
