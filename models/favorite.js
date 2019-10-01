"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "Favorite",
    {
      replyId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    { timestamps: false }
  );
  Favorite.associate = function(models) {};

  Favorite.removeAttribute("id");
  return Favorite;
};
