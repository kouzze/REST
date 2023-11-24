const Request = require('./../model/request');
const { checkReservationOverlap, checkRoomAndUserExist, getUserById, getRoomName, getIncludeForReservations } = require('../utils/reserveUtils');

const reserveController = {};

reserveController.getAllReservations = async (req, res) => {
  try {
    const reservations = await Request.findAll({ include: getIncludeForReservations() });
    res.json(reservations);
  } catch (error) {
    console.error('Error retrieving reservations:', error);
    res.status(500).json({ error: 'Error retrieving reservations' });
  }
};

reserveController.createReservation = async (req, res) => {
  try {
    let { date_req, time_start, time_end, uuid_room, token_users } = req.body;

    token_users = token_users.toString();

    const user = await getUserById(token_users);
    const room = await getRoomName(uuid_room);

    if (!await checkRoomAndUserExist(uuid_room, token_users)) {
      return res.status(404).json({ error: 'Habitación o usuario no encontrados' });
    }

    if (await checkReservationOverlap(uuid_room, date_req, time_start, time_end)) {
      return res.status(409).json({ error: 'Ya existe una reserva para esta habitación en este período de tiempo' });
    }

    const newReservation = await Request.create({
      date_req,
      time_start,
      time_end,
      uuid_room,
      token_users,
    });

    newReservation.dataValues.userEmail = user.email;
    newReservation.dataValues.room = room.name;

    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
}

module.exports = reserveController;
