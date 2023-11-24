const { DataTypes } = require('sequelize');
const sequelize = require('./../config/pg');

const Type = sequelize.define('type', {
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Type;
