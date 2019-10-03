export default (sequelize, DataTypes) => {
  const Thread = sequelize.define(
    "Thread",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        unique: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      channelId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM("UNSOLVED", "SOLVED"),
        allowNull: false,
        defaultValue: "UNSOLVED"
      },
      isLocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      lastRepliedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {}
  );
  Thread.associate = models => {
    Thread.belongsTo(models.User, {
      foreignKey: "userId"
    });
    Thread.belongsTo(models.Channel, {
      foreignKey: "channelId"
    });
    Thread.hasMany(models.Reply, {
      foreignKey: "threadId"
    });
  };
  Thread.beforeCreate(thread => {
    thread.slug = thread.title.toLowerCase().replace(/\s/g, "-");
  });
  return Thread;
};
