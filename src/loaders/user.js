import DataLoader from "dataloader";
import models from "../models";

const batchUsers = async (ids, models) => {
  const users = await models.User.findAll({
    where: { id: { [models.Sequelize.Op.in]: ids } }
  });

  return ids.map(id => users.find(user => user.id === id));
};

const userLoader = () => new DataLoader(ids => batchUsers(ids, models));

export default userLoader;
