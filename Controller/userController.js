const UserModel = require("../Model/userModel");
const bcrypt = require("bcrypt");

exports.setTimestamp = (req, res, next) => {
  const unixTimestamp = new Date().getTime();
  req.unixTimestamp = unixTimestamp; // Adding the timestamp to the request object
  next();
};

exports.userRegister = async (req, res, next) => {
  try {
    console.log(req.body);
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



// exports.getUsers = async (req, res, next) => {
//   try {
//       const users = await UserModel.findAll({
//         attributes: ["name", "username", "email"],
//       });
//       if (users) {
//         return res.status(201).json({
//           message: "success",
//           payload: {
//             data: users,
//           },
//         });
//       } else {
//         throw new Error("User not found");
//       }
//   } catch (error) {
//     res.status(500).json({
//       message: "failed",
//       payload: {
//         data: error,
//       },
//     });
//   }
// };

exports.getUsers = async (req, res, next) => {
  try {

    const queryString = req.query;
    const permitedQuery = ['limit', 'order'];
    const filteredQueryString = Object.fromEntries(
      Object.entries(queryString).filter(([key]) => permitedQuery.includes(key))
    );
    console.log(filteredQueryString);

    const users = await UserModel.findAll({
      attributes: ["name", "username", "email"],
      limit: 10,
      // order: []
    });


    return res.status(200).json({
      message: "success",
      payload: {
        data: users,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
      payload: {
        error: error.message,
      },
    });
  }
};