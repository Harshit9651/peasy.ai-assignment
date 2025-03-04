const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FetchedUser = sequelize.define(
  "FetchedUser",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    details: { type: DataTypes.JSONB }, // JSONB type match karega PostgreSQL se
  },
  {
    tableName: "users", // Manually Table Name Set Karna
    timestamps: false, // Agar createdAt, updatedAt nahi chahiye
  }
);

module.exports = FetchedUser;
