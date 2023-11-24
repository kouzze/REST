const { DataTypes } = require('sequelize');
const sequelize = require('./../config/pg');

const Location = sequelize.define('location', {
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Location;
