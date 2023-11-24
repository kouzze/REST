const express = require('express');
const router = express.Router();

const Room = require('./../model/room');
const { isValidUuid } = require('../utils/utils');

const roomsController = {};

roomsController.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

roomsController.getRoomByCode = async (req, res) => {
  const roomCode = req.params.roomCode;

  //! Comprueba si el UUID es válido
  if (!isValidUuid(roomCode)) {
    //! Si el UUID no es válido, envía una respuesta con un código de estado 400 y un mensaje de error
    return res.status(400).send('El código de sala no es válido');
  }

  try {
    const room = await Room.findOne({
      where: {
        uuid: roomCode,
      },
    });
    if (room) {
      res.json(room);
    } else {
      res.status(404).send('Sala no encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

//* Crear una nueva sala
roomsController.createRoom = async (req, res) => {
  try {
    const newRoom = req.body;

    if (!newRoom) {
      return res.status(400).json({ error: 'El cuerpo de la solicitud no es un JSON válido.' });
    }

    //! Verificar si se proporcionaron todos los campos necesarios
    const requiredFields = ['name', 'capacity'];

    const missingFields = requiredFields.filter(field => !(field in newRoom));

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
    }

    //! Verificar si los campos obligatorios no son null
    if (newRoom.name === null || newRoom.capacity === null) {
      return res.status(400).json({ error: 'Los campos obligatorios no pueden ser null.' });
    }

    //! Verificar si ya existe una sala con el mismo nombre
    const existingRoom = await Room.findOne({ where: { name: newRoom.name } });
    if (existingRoom) {
      return res.status(400).json({ error: 'Ya existe una sala con este nombre.' });
    }

    //! Crear la sala si no existe
    const createdRoom = await Room.create(newRoom);
    res.status(201).json(createdRoom);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

//* Actualizar una sala específica
roomsController.updateRoomByCode = async (req, res) => {
  const roomCode = req.params.roomCode;

  if (!isValidUuid(roomCode)) {
    return res.status(400).send('El código de sala no es válido');
  }

  const updatedRoom = req.body;

  if (!updatedRoom) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud no es un JSON válido.' });
  }

  const requiredFields = ['name', 'capacity'];

  const missingFields = requiredFields.filter(field => !(field in updatedRoom));

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
  }

  if (Object.values(updatedRoom).includes(null)) {
    return res.status(400).send('Los valores nulos no están permitidos');
  }

  try {
    const room = await Room.findOne({
      where: {
        uuid: roomCode,
      },
    });
    if (room) {
      await room.update(updatedRoom);
      res.json(room);
    } else {
      res.status(404).send('Sala no encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

//* Eliminar una sala específica
roomsController.deleteRoomByCode = async (req, res) => {
  const roomCode = req.params.roomCode;

  if (!isValidUuid(roomCode)) {
    return res.status(400).send('El código de sala no es válido');
  }

  try {
    const room = await Room.findOne({
      where: {
        uuid: roomCode,
      },
    });
    if (room) {
      await room.destroy();
      res.json(room);
    } else {
      res.status(404).send('Sala no encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = roomsController;