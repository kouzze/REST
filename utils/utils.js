function isValidUuid(uuid) {
  const uuidRegex = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-4[0-9a-fA-F]{3}\-(8|9|a|b)[0-9a-fA-F]{3}\-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
}

function isValidIdCode(id, res) {
  if (isNaN(id)) {
    res.status(400).json({ error: 'El código de usuario debe ser un número.' });
    return false;
  }
  return true;
}

function isValidJson(req, res) {
  if (!req) {
    res.status(400).json({ error: 'El cuerpo de la solicitud no es un JSON válido.' });
    return false;
  }
  if (Object.values(req).includes(null)) {
    res.status(400).send('Los valores nulos no están permitidos');
    return false;
  }
  return true;
}



module.exports = { isValidUuid, isValidIdCode, isValidJson };