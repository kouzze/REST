const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('¡La aplicación está funcionando correctamente!');
});

module.exports = router;
