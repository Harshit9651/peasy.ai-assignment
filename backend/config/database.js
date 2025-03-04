const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This is necessary for Neon.tech
    },
  },
});

sequelize.sync({ alter: true })  // Auto sync database
  .then(() => console.log("Database Connected ✅"))
  .catch(err => console.error("DB Connection Error:", err));

module.exports = sequelize;
