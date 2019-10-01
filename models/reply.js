"use strict";
module.exports = (sequelize, DataTypes) => {
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
  Reply.associate = function(models) {
    Reply.belongsTo(models.User, {
      foreignKey: "userId"
    });
    Reply.belongsTo(models.Thread, {
      foreignKey: "threadId"
    });
  };
  return Reply;
};
