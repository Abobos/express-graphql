const { ApolloError, ForbiddenError } = require("apollo-server-express");

module.exports = {
  Query: {
    async thread(parent, { id }, { models }) {
      const thread = await models.Thread.findByPk(id);

      if (!thread) throw new ApolloError("No thread found");

      return thread;
    },

    threads(parent, args, { models }) {
      return models.Thread.findAll();
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

      if (authUser.id !== thread.userId) {
        throw new ForbiddenError("You can only edit your own thread");
      }

      await thread.update({ title, content });

      return thread;
    }
  },
  Thread: {
    channel(thread) {
      return thread.getChannel();
    },
    creator(thread) {
      return thread.getUser();
    }
  }
};
