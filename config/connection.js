const Sequelize = require("sequelize");

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("Current directory:", process.cwd());
console.log("Is DATABASE_URL defined?", !!process.env.DATABASE_URL);

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
