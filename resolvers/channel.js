module.exports = {
  Query: {
    allChannels(parent, args, { models }) {
      return models.Channel.findAll();
    }
  }
};
