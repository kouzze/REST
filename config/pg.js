const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  database: 'postgres',
  username: 'admin',
  password: 'admin',
  port: 5432,
});

module.exports = sequelize;
