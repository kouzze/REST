const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Room = require('../model/room');
const Users = require('../model/users');
const Request = require('../model/request');

function getIncludeForReservations() {
  return [
    {
      model: Users,
      attributes: ['email'],
    },
    {
      model: Room,
      attributes: ['name'],
    },
  ];
}

async function getUserById(id) {
  const user = await Users.findOne({ where: { id } });
  return user;
}

async function getRoomName(uuid) {
  const room = await Room.findOne({ where: { uuid } });
  return room;
}

async function checkRoomAndUserExist(uuid_room, token_users) {
  const roomExists = await Room.findByPk(uuid_room);
  const userExists = await Users.findOne({ where: { id: token_users } });

  return roomExists && userExists;
}

async function checkReservationOverlap(uuid_room, date_req, time_start, time_end) {
  const existingReservation = await Request.findOne({
    where: {
      uuid_room,
      date_req,
      time_start: {
        [Op.lte]: Sequelize.literal(`TIME '${time_end}'`)
      },
      time_end: {
        [Op.gte]: Sequelize.literal(`TIME '${time_start}'`)
      }
    }
  });

  return existingReservation;
}

module.exports = { checkRoomAndUserExist, checkReservationOverlap, getUserById, getRoomName, getIncludeForReservations };