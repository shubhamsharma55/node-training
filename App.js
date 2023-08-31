const express = require('express');
const app = express();
const morgan =  require('morgan')

// MIDDLE WARE
app.use(morgan('dev'));
app.use(express.json())
setTimestamp = (req, res, next) => {
  const unixTimestamp = new Date().getTime();
  req.unixTimestamp = unixTimestamp; // Adding the timestamp to the request object
  next();
};
// MIDDLE WARE

const userRoutes =  require('./Routes/userRoute');

app.use('/api/v1/', userRoutes);

module.exports = app;