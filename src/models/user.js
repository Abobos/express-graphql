import bcrypt from "bcrypt";

export default (sequelize, DataTypes) => {
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
  User.associate = models => {
    User.hasMany(models.Thread, {
      foreignKey: "userId"
    });

    User.hasMany(models.Reply, {
      foreignKey: "userId"
    });
  };

  User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  User.beforeUpdate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  return User;
};
