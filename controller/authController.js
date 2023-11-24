const express = require('express');

const authController = {};

authController.isWorking = (req, res) => {
  res.send('¡La aplicación está funcionando correctamente!');
};

module.exports = authController;
