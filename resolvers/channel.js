module.exports = {
  Query: {
    async allChannels(parent, args, { models }) {
      return await models.Channel.findAll();
    }
  }
};
