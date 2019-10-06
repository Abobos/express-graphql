import { ApolloError, ForbiddenError } from "apollo-server-express";

export default {
  Query: {
    async thread(parent, { id }, { models }) {
      const thread = await models.Thread.findByPk(id);

      if (!thread) throw new ApolloError("No thread found");

      return thread;
    },

    async threads(parent, { channelSlug, status }, { models }) {
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

      return models.Thread.findAll({ where: whereOptions });
    },

    async threadsByMe(parent, args, { models, authUser }) {
      return await models.Thread.findAll({ where: { userId: authUser.id } });
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
    channel(thread) {
      return thread.getChannel();
    },
    creator(thread) {
      return thread.getUser();
    },
    replies(thread) {
      return thread.getReplies();
    }
  }
};
