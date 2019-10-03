import { ForbiddenError } from "apollo-server-express";

export default {
  Mutation: {
    async createReply(parent, args, { models, authUser }) {
      const { threadId, content } = args;
      const thread = await models.Thread.findByPk(threadId);

      const reply = await models.Reply.create({
        threadId,
        content,
        userId: authUser.id
      });

      await thread.update({ lastRepliedAt: new Date() });
      return reply;
    },

    async markReplyAsBestAnswer(parent, { id }, { models, authUser }) {
      const reply = await models.Reply.findByPk(id);
      const thread = await reply.getThread();

      if (thread.userId !== authUser.id) {
        throw new ForbiddenError(
          "You can only mark a reply as best answer on your own threads"
        );
      }

      await reply.update({ isBestAnswer: true });
      await thread.update({ status: "SOLVED" });

      return reply;
    },

    async unmarkReplyAsBestAnswer(parent, args, { models, authUser }) {
      const { id, content } = args;
      const reply = await models.Reply.findByPk(args.id);

      if (thread.userId !== authUser.id) {
        throw new ForbiddenError("You can only edit your own replies");
      }

      await reply.update({ content });

      return reply;
    },

    async updateReply(parent, args, { models, authUser }) {
      const { id, content } = args;
      const reply = await models.Reply.findByPk(id);

      if (authUser.id !== reply.userId) {
        throw new ForbiddenError("You can only edit your own replies");
      }

      await reply.update({ content });

      return reply;
    }
  },
  Reply: {
    favorites(reply) {
      return reply.getFavorites();
    },
    user(reply) {
      return reply.getUser();
    }
  }
};
