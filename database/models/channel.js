"use strict";
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    "Channel",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultvalue: DataTypes.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {}
  );
  Channel.associate = function(models) {
    // associations can be defined here
    Channel.hasMany(models.Thread);
  };
  return Channel;
};
