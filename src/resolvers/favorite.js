export default {
  Mutation: {
    async markAsFavorite(parent, { replyId }, { models, authUser }) {
      const [favorite] = await models.Favorite.findOrCreate({
        where: {
          replyId,
          userId: authUser.id
        }
      });
      return favorite;
    },
    async unmarkAsFavorite(parent, { replyId }, { models, authUser }) {
      const favorite = await models.Favorite.findOne({
        where: {
          replyId,
          userId: authUser.id
        }
      });

      await favorite.destroy();

      return true;
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
