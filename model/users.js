const { DataTypes } = require('sequelize');
const sequelize = require('./../config/pg');
const jwt = require('jsonwebtoken');
const BigNumber = require('bignumber.js');

const Users = sequelize.define('users', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => new BigNumber(0),
  },
  token: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});

Users.beforeCreate((user) => {
  if (user.id) {
    user.id = new BigNumber(user.id);
  }
});

Users.prototype.generateJWT = function () {
  const payload = {
    id: this.id,
    name: this.name,
    email: this.email,
  };

  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = Users;
