const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'motty.db.elephantsql.com',
  database: 'ftsomtvd',
  username: 'ftsomtvd',
  password: 'lqeSpoLls3xNAB8qlxSLWvT2yXsWz-RJ',
  port: 5432,
});

module.exports = sequelize;
