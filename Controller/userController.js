const UserModel = require("../Model/userModel");
const bcrypt = require("bcrypt");

exports.setTimestamp = (req, res, next) => {
  const unixTimestamp = new Date().getTime();
  req.unixTimestamp = unixTimestamp; // Adding the timestamp to the request object
  next();
};

exports.userGet = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (hashedPassword) {
      const newUser = await UserModel.create({
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
      });
      if (newUser) {
        return res.status(201).json({
          requestedAt: req.unixTimestamp,
          message: "success",
          payload: {
            data: "user created!",
          },
        });
      } else {
        throw new Error("User not created");
      }
    } else{
        throw new Error("User password could not be hashed");
    }
  } catch (error) {
    res.status(500).json({
      message: "failed",
      payload: {
        data: error,
      },
    });
  }
};
