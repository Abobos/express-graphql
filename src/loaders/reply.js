import DataLoader from "dataloader";
import models from "../models";

const batchReplies = async (ids, models) => {
  const replies = await models.Reply.findAll({
    where: { id: { [models.Sequelize.Op.in]: ids } }
  });

  return ids.map(id => replies.find(reply => reply.id === id));
};
const replyLoader = () => new DataLoader(ids => batchReplies(ids, models));

export default replyLoader;
