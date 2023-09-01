const app = require('express');
const router = app.Router();
const userController = require('../Controller/userController');

router.post(
  "/register",
  userController.setTimestamp,
  userController.userRegister
);

router.get(
    "/users",
    userController.getUsers
);


module.exports =  router;