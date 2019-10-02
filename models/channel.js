"use strict";
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    "Channel",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Channel.associate = function(models) {
    Channel.hasMany(models.Thread, {
      foreignKey: "channelId"
    });
  };
  return Channel;
};
