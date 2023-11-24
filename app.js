require("dotenv").config();
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");

const testRoutes = require('./routes/testRoutes');
const roomsRoutes = require('./routes/roomsRoutes');
const reserveRoutes = require('./routes/reserveRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const syncDatabase = require('./config/dbSync');
require('./config/auth');


const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


//* Aqui invocamos a las rutas! 😎
app.use('/v1/test', testRoutes);
app.use('/v1/rooms', roomsRoutes);
app.use('/v1/reserve', reserveRoutes);
app.use('/v1/user', userRoutes);
app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//* Llamando al metodo que conecta con la bd
syncDatabase();

module.exports = app;