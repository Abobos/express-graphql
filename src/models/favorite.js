export default (sequelize, DataTypes) => {
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
  Favorite.associate = models => {
    Favorite.belongsTo(models.Reply, {
      foreignKey: "replyId"
    });
    Favorite.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };

  Favorite.removeAttribute("id");
  return Favorite;
};
