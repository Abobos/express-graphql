import { favoriteEvents } from "../utils/events";

export default {
  Mutation: {
    async markAsFavorite(parent, { replyId }, { models, authUser, pubsub }) {
      const [favorite] = await models.Favorite.findOrCreate({
        where: {
          replyId,
          userId: authUser.id
        }
      });

      pubsub.publish(favoriteEvents.REPLY_FAVORITED, {
        replyFavorited: favorite
      });

      return favorite;
    },
    async unmarkAsFavorite(parent, { replyId }, { models, authUser, pubsub }) {
      const favorite = await models.Favorite.findOne({
        where: {
          replyId,
          userId: authUser.id
        }
      });

      await favorite.destroy();

      pubsub.publish(favoriteEvents.REPLY_UNFAVORITED, { replyUnfavorited: favorite });

      return true;
    }
  },

  Subscription: {
    replyFavorited: {
      subscribe(parent, args, { pubsub }) {
        return pubsub.asyncIterator([favoriteEvents.REPLY_FAVORITED]);
      }
    },
    replyUnfavorited: {
      subscribe(parent, args, { pubsub }) {
        return pubsub.asyncIterator([favoriteEvents.REPLY_UNFAVORITED]);
      }
    }
  },

  Favorite: {
    user(favorite) {
      return favorite.getUser();
    },
    reply(favorite) {
      return favorite.getReply();
    }
  }
};
