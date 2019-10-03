import "dotenv/config";

export default {
  development: {
    use_env_variable: "DATABASE_URL_DEV",
    dialect: "postgres"
  }
};
