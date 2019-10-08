import { ApolloError, ForbiddenError } from "apollo-server-express";
import { encodeCursor, decodeCursor } from "../utils/cursor";

export default {
  Query: {
    async thread(parent, { id }, { models }) {
      const thread = await models.Thread.findByPk(id);

      if (!thread) throw new ApolloError("No thread found");

      return thread;
    },

    async threads(parent, args, { models }) {
      const { channelSlug, status, perPage = 15, page = 1 } = args;
      const whereOptions = {};

      if (status) {
        whereOptions.status = status;
      }

      if (channelSlug) {
        const channel = await models.Channel.findOne({
          where: {
            slug: channelSlug
          }
        });

        if (!channel) throw new ApolloError("Channel not found");

        whereOptions.channelId = channel.id;
      }

      return models.Thread.findAll({
        where: whereOptions,
        order: [["lastRepliedAt", "DESC"]],
        limit: perPage,
        offset: perPage * (page - 1)
      });
    },

    async threadsByMe(parent, args, { models, authUser }) {
      const { perPage = 15, page = 1 } = args;

      return await models.Thread.findAll({
        where: { userId: authUser.id },
        order: [["lastRepliedAt", "DESC"]],
        limit: perPage,
        offset: perPage * (page - 1)
      });
    }
  },

  Mutation: {
    createThread(parent, args, { models, authUser }) {
      return models.Thread.create({
        ...args,
        userId: authUser.id,
        lastRepliedAt: new Date()
      });
    },

    async updateThread(parent, args, { models, authUser }) {
      const { id, title, content } = args;
      const thread = await models.Thread.findByPk(id);

      if (thread.isLocked) throw new ApolloError("Thread has been locked");

      if (authUser.id !== thread.userId) {
        throw new ForbiddenError("You can only edit your own thread");
      }

      await thread.update({ title, content });

      return thread;
    },

    async deleteReply(parent, { id }, { models, authUser }) {
      const reply = await models.Reply.findByPk(id);

      if (reply.id !== authUser.userId) {
        throw new ForbiddenError("You can only delete your own replies");
      }

      await reply.destroy();

      return true;
    },

    async lockThread(parent, { id }, { models, authUser }) {
      const thread = await models.Thread.findByPk(id);

      if (thread.isLocked) throw new ApolloError("Thread is already locked");

      await thread.update({ isLocked: true });

      return thread;
    },

    async unlockThread(parent, { id }, { models, authUser }) {
      const thread = await models.Thread.findByPk(id);

      if (!thread.isLocked) throw new ApolloError("Thread is already unLocked");

      await thread.update({ isLocked: false });

      return thread;
    }
  },

  Thread: {
    channel(thread, args, { loaders }) {
      return loaders.channel.load(thread.channelId);
    },
    creator(thread, args, { loaders }) {
      return loaders.user.load(thread.userId);
    },
    async replies(thread, { perPage = 15, after }, { models, loaders }) {
      // return loaders.reply.load(thread.id);
      const whereOptions = {
        threadId: thread.id
      };

      if (after) {
        whereOptions.createdAt = {
          [models.Sequelize.Op.gt]: decodeCursor(after)
        };
      }

      const { rows, count } = await models.Reply.findAndCountAll({
        order: [["createdAt", "ASC"]],
        limit: perPage,
        where: whereOptions
      });

      return {
        edges: rows,
        pageInfo: {
          endCursor: rows.length
            ? encodeCursor(rows[rows.length - 1].createdAt.toISOString())
            : null,
          hasMore: rows.length ? count > rows.length : false
        }
      };
    }
  }
};
