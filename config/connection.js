const Sequelize = require("sequelize");

// Remove dotenv config since Render provides env vars directly
console.log("Environment check:");
console.log("Current directory:", process.cwd());
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("Is DATABASE_URL defined?", !!process.env.DATABASE_URL);

// Force SSL for Render
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  dialect: "postgres",
});

module.exports = sequelize;
