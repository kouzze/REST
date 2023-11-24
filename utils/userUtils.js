async function hasRequiredFieldsUser(user, res) {
  const requiredFields = ['name', 'email'];
  const missingFields = requiredFields.filter(field => !(field in user));

  if (missingFields.length > 0) {
    res.status(400).json({ error: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
    return false;
  }

  if (user.name === null || user.email === null) {
    res.status(400).json({ error: 'Los campos obligatorios no pueden ser null.' });
    return false;
  }

  return true;
}

async function doesNotExistUser(user, Users, res) {
  const existingUser = await Users.findOne({ where: { name: user.name } });
  if (existingUser) {
    res.status(400).json({ error: 'Ya existe un usuario con este nombre.' });
    return false;
  }

  return true;
}

async function doesNotExistUserId(user, Users, res) {
  const existingUser = await Users.findOne({ where: { id: user.id } });
  if (existingUser) {
    res.status(400).json({ error: 'Ya existe un usuario con este id.' });
    return false;
  }

  return true;
}

module.exports = { hasRequiredFieldsUser, doesNotExistUser, doesNotExistUserId };
