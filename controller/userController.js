const express = require('express');
const router = express.Router();

const Users = require('./../model/users');
const { isValidIdCode, isValidJson } = require('../utils/utils');
const { doesNotExistUser, hasRequiredFieldsUser, doesNotExistUserId } = require('../utils/userUtils');

const BigNumber = require('bignumber.js');
const shortid = require('shortid');

const userController = {};

userController.getAllUser = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

userController.getUserById = async (req, res) => {
  const userId = req.params.userId;

  if (!isValidIdCode(userId)) {
    return;
  }

  try {
    const users = await Users.findOne({
      where: {
        id: userId,
      },
    });
    if (users) {
      res.json(users);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

userController.createUser = async (req, res) => {
  try {
    const newUser = req.body;

    if (!newUser.id) {
      newUser.id = parseInt(shortid.generate(), 36);
    } else if (isNaN(newUser.id)) {
      console.error('Invalid id:', newUser.id);
      res.status(400).send('Invalid id');
      return;
    } else {
      const bigId = new BigNumber(newUser.id);
      newUser.id = bigId.toString();
    }

    const bigId = new BigNumber(newUser.id);

    newUser.id = bigId.toString();

    if (!await hasRequiredFieldsUser(newUser, res) || !await doesNotExistUser(newUser, Users, res) ||
      !await doesNotExistUserId(newUser, Users, res)) {
      return;
    }

    const createdUser = await Users.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

userController.updateUserByCode = async (req, res) => {
  const userCode = req.params.userCode;
  const updatedUser = req.body;

  if (!isValidIdCode(userCode, res) || !isValidJson(updatedUser, res)) {
    return;
  }

  try {
    const users = await Users.findOne({
      where: {
        id: userCode,
      },
    });
    if (users) {
      await users.update(updatedUser);
      res.json(users);
    } else {
      res.status(404).send('Usuario no encontrada');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

userController.deleteUserById = async (req, res) => {
  const userId = req.params.userId;

  if (!isValidIdCode(userId, res)) {
    return;
  }

  try {
    const users = await Users.findOne({
      where: {
        id: userId,
      },
    });
    if (users) {
      await users.destroy();
      res.json(users);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = userController;