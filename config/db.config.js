module.exports = {
  HOST: "10.11.201.88",
  PORT: 2888,
  USER: "eremit",
  PASSWORD: "remit@Era",
  DB: "eremitDB",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};



// const Sequelize = require('sequelize');    
    
// // Option 1: Passing parameters separately    
// const sequelize = new Sequelize('database', 'username', 'password', {    
//   host: 'localhost',    
//   dialect:'mysql'   
// });    
    
// module.exports=sequelize;    