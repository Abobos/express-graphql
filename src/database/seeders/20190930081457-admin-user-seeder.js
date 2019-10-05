import bcrypt from "bcrypt";
import uuid from "uuid/v4";

export default {
  up: queryInterface =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuid(),
          username: "mezie",
          email: "chimezie@tutstack.io",
          password: bcrypt.hashSync("password", 10),
          role: "ADMIN",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete("Users", null, {})
};
