import DataLoader from "dataloader";
import models from "../models";
import groupBy from "lodash.groupby";

const batchReplies = async (ids, models) => {
  const replies = await models.Reply.findAll({
    order: [["createdAt", "ASC"]],
    where: { id: { [models.Sequelize.Op.in]: ids } }
  });

  const groupByThreadId = groupBY(replies, "threadId");

  return ids.map(id => groupByThreadId[id] || []);
};
const repliesLoader = () => new DataLoader(ids => batchReplies(ids, models));

export default repliesLoader;
