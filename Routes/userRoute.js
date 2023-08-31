const app = require('express');
const router = app.Router();
const userController = require('../Controller/userController');

router.get('/', userController.setTimestamp, userController.userGet);


module.exports =  router;