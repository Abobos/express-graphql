import { ApolloError, AuthenticationError } from "apollo-server-express";
import bcrypt from "bcrypt";

import cloudinary from "../config/cloudinary";
import { createToken } from "../utils/tokenHandler";
import { rejects } from "assert";

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
    },

    async user(parent, { username }, { models, authUser }) {
      const user = await models.User.findOne({ where: { username } });

      if (!user) throw new ApolloError("No user found");

      return user;
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
    },

    async uploadAvatar(parent, { avatar }, { models, authUser }) {
      const { createReadStream } = await avatar;

      try {
        const result = await new Promis((resolve, reject) => {
          createReadStream.pipe(
            cloudinary.uploader.upload_stream((error, result) => {
              if (error) reject(error);
              resolve(result);
            })
          );
        });

        const user = await models.User.findByPk(authUser.id);

        await user.update({ avatar: result.secure_url });
      } catch (err) {
        throw new ApolloError("Image");
      }
    }
  }
};
