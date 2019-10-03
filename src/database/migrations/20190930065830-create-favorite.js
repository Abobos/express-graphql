export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("Favorites", {
      replyId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      }
    }),
  down: queryInterface => queryInterface.dropTable("Favorites")
};
