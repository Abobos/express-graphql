"use strict";

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      role: {
        type: DataTypes.ENUM("ADMIN", "USER"),
        allowNull: false,
        defaultValue: "USER"
      },
      avatar: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      }
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Thread);
    User.hasMany(models.Reply);
  };
  User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
  });
  return User;
};
