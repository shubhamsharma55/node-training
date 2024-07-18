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
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports =  router;