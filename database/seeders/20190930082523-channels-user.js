"use strict";

const uuid = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Channels",
      [
        {
          id: uuid(),
          name: "General",
          slug: "general",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: " AdonisJS",
          slug: "adonisjs",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: uuid(),
          name: "Vue",
          slug: "vue",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Channels", null, {});
  }
};
