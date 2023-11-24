const { DataTypes } = require('sequelize');
const sequelize = require('./../config/pg');

const Type = require('./type');
const Location = require('./location');

const Room = sequelize.define('room', {
  uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  capacity: {
    type: DataTypes.INTEGER,
  },
});

Room.belongsTo(Location);
Room.belongsTo(Type);

module.exports = Room;
