export default {
  Query: {
    channels(parent, args, { models }) {
      return models.Channel.findAll();
    }
  }
};
