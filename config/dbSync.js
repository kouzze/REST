const sequelize = require('./pg');
const Type = require('./../model/type');
const Location = require('.././model/location');
const Room = require('.././model/room');
const Users = require('./../model/users');
const Request = require('./../model/request');

//! Define las relaciones entre los modelos
Room.belongsTo(Location);
Room.belongsTo(Type);
Request.belongsTo(Room, { foreignKey: 'uuid_room' });
Request.belongsTo(Users, { foreignKey: 'token_users' });

async function syncDatabase() {
  try {
    //* Sincroniza los modelos con la base de datos 
    //! force: false para no borrar la base de datos
    //! force: true para borrar la base de datos
    await sequelize.sync({ force: false });
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar ', error);
  }
}

module.exports = syncDatabase;
