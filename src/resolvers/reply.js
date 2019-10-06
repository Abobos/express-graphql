import { ForbiddenError } from "apollo-server-express";
import { replyEvents } from "../utils/events";

export default {
  Mutation: {
    async createReply(parent, args, { models, authUser, pubsub }) {
      const { threadId, content } = args;
      const thread = await models.Thread.findByPk(threadId);

      if (thread.isLocked) throw new ApolloError("Thread has been locked");

      const reply = await models.Reply.create({
        threadId,
        content,
        userId: authUser.id
      });

      await thread.update({ lastRepliedAt: new Date() });

      pubsub.publish(replyEvents.REPLY_ADDED, { replyAdded: reply });

      return reply;
    },

    async markReplyAsBestAnswer(parent, { id }, { models, authUser, pubsub }) {
      const reply = await models.Reply.findByPk(id);
      const thread = await reply.getThread();

      if (thread.isLocked) throw new ApolloError("Thread has been locked");

      if (thread.userId !== authUser.id) {
        throw new ForbiddenError(
          "You can only mark a reply as best answer on your own threads"
        );
      }

      await reply.update({ isBestAnswer: true });
      await thread.update({ status: "SOLVED" });

      pubsub.publish(replyEvents.REPLY_MARKED_AS_BEST_ANSWER, {
        replyMarkedAsBestAnswer: reply
      });

      return reply;
    },

    async unmarkReplyAsBestAnswer(parent, args, { models, authUser, pubsub }) {
      const reply = await models.Reply.findByPk(args.id);
      const thread = await reply.getThread();

      if (thread.isLocked) throw new ApolloError("Thread has been locked");

      if (thread.userId !== authUser.id) {
        throw new ForbiddenError(
          "You can only unmark a reply as best answer on your own threads"
        );
      }

      await reply.update({ isBestAnswer: false });
      await thread.update({ status: "UNSOLVED" });

      pubsub.publish(replyEvents.REPLY_UNMARKED_AS_BEST_ANSWER, {
        replyUnmarkedAsBestAnswer: reply
      });

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

  Subscription: {
    replyAdded: {
      subscribe(parent, args, { pubsub }) {
        return pubsub.asyncIterator([replyEvents.REPLY_ADDED]);
      }
    },
    replyMarkedAsBestAnswer: {
      subscribe(parent, args, { pubsub }) {
        return pubsub.asyncIterator([replyEvents.REPLY_MARKED_AS_BEST_ANSWER]);
      }
    },
    replyUnmarkedAsBestAnswer: {
      subscribe(parent, args, { pubsub }) {
        return pubsub.asyncIterator([
          replyEvents.REPLY_UNMARKED_AS_BEST_ANSWER
        ]);
      }
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
