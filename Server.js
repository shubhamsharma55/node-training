// EXPRESS APP IMPORT
const app = require("./App");
const dotenv = require('dotenv');
const result = dotenv.config({ path: './Config/.env' });
const PORT = process.env.PORT;
const HOST = process.env.HOST;
// EXPRESS APP IMPORT

// DATABASE
const { Sequelize } = require('sequelize');
const DB = {
  DB_NAME : process.env.DB_NAME,
  DB_HOST : process.env.DB_HOST,
  DB_USER : process.env.DB_USER,
  DB_PASSWORD : process.env.DB_PASSWORD, 
  DB_DIALECT : process.env.DB_DIALECT, 
}

const sequelize = new Sequelize(DB.DB_NAME, DB.DB_USER, DB.DB_PASSWORD, {
  host: DB.DB_HOST,
  dialect: DB.DB_DIALECT, 
});
// DATABASE

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB CONNECTED.');
  } catch (error) {
    console.error('DB CONNECTION', error);
  }
})();



app.listen(PORT, HOST, function () {
  console.log(`Server Running On Port ${PORT} In ${process.env.NODE_ENV} Env.`);
});



