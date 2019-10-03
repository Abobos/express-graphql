import uuid from "uuid/v4";

export default {
  up: queryInterface =>
    queryInterface.bulkInsert(
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
    ),
  down: queryInterface => queryInterface.bulkDelete("Channels", null, {})
};
