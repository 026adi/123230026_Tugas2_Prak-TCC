const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Notes = sequelize.define("Notes", {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tanggal_dibuat: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "notes",
  timestamps: false,
});

module.exports = Notes;