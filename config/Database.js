import { Sequelize } from "sequelize";
import "dotenv/config";

const DatabaseName = process.env.DB_NAME;
const DatabaseUsername = process.env.DB_USERNAME;
const DatabasePassword = process.env.DB_PASSWORD;
const DatabaseHost = process.env.DB_HOST;
const DatabaseDialect = process.env.DB_DIALECT;

const db = new Sequelize(DatabaseName, DatabaseUsername, DatabasePassword, {
  host: DatabaseHost,
  dialect: DatabaseDialect,
});

export default db;
