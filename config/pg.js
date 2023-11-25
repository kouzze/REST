const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: 5432,
});

module.exports = sequelize;
