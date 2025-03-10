const Sequelize = require("sequelize");
require("dotenv").config({ path: "../Develop/server/.env" });

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
      }
    );

module.exports = sequelize;
