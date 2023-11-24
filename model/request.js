const { DataTypes } = require('sequelize');
const sequelize = require('./../config/pg');
const Room = require('./room');
const User = require('./users');

const Request = sequelize.define('request', {
  token: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  date_req: {
    type: DataTypes.DATE,
  },
  time_start: {
    type: DataTypes.TIME,
  },
  time_end: {
    type: DataTypes.TIME,
  },
});

Request.belongsTo(Room, { foreignKey: 'uuid_room' });
Request.belongsTo(User, { foreignKey: 'token_users' });

module.exports = Request;
