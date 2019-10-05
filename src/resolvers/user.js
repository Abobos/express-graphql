import { ApolloError, AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { createToken } from "../utils/tokenHandler";

export default {
  Query: {
    me(parent, args, { models, authUser }) {
      return models.User.findByPk(authUser.id);
    },

    async signIn(parent, { email, password }, { models }) {
      const user = await models.User.findOne({ where: { email } });

      if (!user) throw new AuthenticationError("Invalid credentials");

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        throw new AuthenticationError("Invalid credentials");

      const userDetails = { id: user.id, email: user.email, role: user.role };

      return { token: createToken(userDetails) };
    }
  },

  Mutation: {
    async signUp(parent, args, { models }) {
      const { email } = args;
      const userExists = await models.User.findOne({ where: { email } });

      if (userExists) {
        throw new ApolloError("Email already in use");
      }

      const user = await models.User.create(args);

      const userDetails = { id: user.id, email: user.email, role: user.role };

      return { token: createToken(userDetails) };
    },

    async updateUser(parent, args, { models, authUser }) {
      const { username, email } = args;
      const user = await models.User.findByPk(authUser.id);

      await user.update({
        username,
        email
      });

      return user;
    },
    async changePassword(parent, args, { models, authUser }) {
      const { currentPassword, newPassword } = args;
      const user = await models.User.findByPk(authUser.id);

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isPasswordValid) throw new ApolloError("Incorrect password");

      await user.update({ password: newPassword });

      return user;
    }
  }
};
