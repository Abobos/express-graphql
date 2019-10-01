module.exports = {
  Mutation: {
    createThread(parent, args, { models, authUser }) {
      return models.Thread.create({
        ...args,
        userId: authUser.id,
        lastRepliedAt: new Date()
      });
    }
  }
};
