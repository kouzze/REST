const express = require('express');
const reserveController = require('./../controller/reserveController');
const router = express.Router();

router.get('/', reserveController.getAllReservations);
router.post('/', reserveController.createReservation);

module.exports = router;
