export default (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    "Reply",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      threadId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      isBestAnswer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {}
  );
  Reply.associate = models => {
    Reply.belongsTo(models.User, {
      foreignKey: "userId"
    });
    Reply.belongsTo(models.Thread, {
      foreignKey: "threadId"
    });
    Reply.hasMany(models.Favorite, {
      foreignKey: "replyId"
    });
  };
  return Reply;
};
