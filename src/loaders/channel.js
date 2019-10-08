import DataLoader from "dataloader";
import models from "../models";

const batchChannels = async (ids, models) => {
  const channels = await models.Channel.findAll({
    where: { id: { [models.Sequelize.Op.in]: ids } }
  });

  return ids.map(id => channels.find(channel => channel.id === id));
};
const channelLoader = () => new DataLoader(ids => batchChannels(ids, models));

export default channelLoader;
