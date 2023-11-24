const express = require('express');
const userController = require('./../controller/userController');
const router = express.Router();

router.get('/', userController.getAllUser);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:userCode', userController.updateUserByCode);
router.delete('/:userId', userController.deleteUserById);


module.exports = router;