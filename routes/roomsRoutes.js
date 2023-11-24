const express = require('express');
const roomsController = require('./../controller/roomsController');
const router = express.Router();

// Obtener todas las salas
router.get('/', roomsController.getAllRooms);

// Obtener una sala específica
router.get('/:roomCode', roomsController.getRoomByCode);

// Crear una nueva sala
router.post('/', roomsController.createRoom);

// Actualizar una sala específica
router.put('/:roomCode', roomsController.updateRoomByCode);

// Eliminar una sala específica
router.delete('/:roomCode', roomsController.deleteRoomByCode);

module.exports = router;
