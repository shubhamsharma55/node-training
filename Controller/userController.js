const UserModel = require('../Model/userModel');

exports.setTimestamp = (req, res, next) => {
  const unixTimestamp = new Date().getTime();
  req.unixTimestamp = unixTimestamp; // Adding the timestamp to the request object
  next();
};

exports.userGet = async (req, res, next)=>{
    try {

        const userData = req.body;
        const newUser = await UserModel.create(userData);

        if(newUser){
            res.status(201).json({
            requestedAt : req.unixTimestamp,
            message : 'success',
            payload : {
                data : 'user created!'
            }
        })
        }else{
             throw new Error('User not created');
        }
       
    } catch (error) {
         res.status(500).json({
            message : 'failed',
            payload : {
                data : error
            }
        })
    }
}