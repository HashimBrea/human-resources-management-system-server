import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER || "root";
const dbPassword = process.env.DB_PASSWORD || "";
const dbName = process.env.DB_NAME || "human-resources-management-system"
const dbHost = process.env.DB_HOST || "localhost";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
});

async function sequelizeAuthenticate() {
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully");
    } catch(error) {
        console.error("Unable to authenticate the database:", error);
    }
};

async function sequelizeSync() {
    try {
        await sequelize.sync();
    } catch(error) {
        console.error("Unable to sync the database:", error);
    }
};

async function initializeDatabase() {
  
    await sequelizeAuthenticate();
    await sequelizeSync();
};

export { sequelize, initializeDatabase };
 