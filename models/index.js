const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  define: {
    freezeTableName: true
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.rmt_moneyGram_acc_dtls = require("./moneyGramAccDtls.model.js")(sequelize, Sequelize);
// db.rmt_moneyGram_cash_api = require("./moneyGramCashAPI.model.js")(sequelize, Sequelize);

module.exports = db;



// const express = require('express')
// const app = express();
// const port = 8000;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}!`)
// });

// const sequelize = require('./config/db');    
// const express   = require('express');     
// const bodyParser = require('body-parser');    
// const path      =  require('path');          
    
// var app = express();    
  
// //setting the template engine     
// app.set('view engine','ejs');    
  
// // provide the complete path of the views folder  
// app.set('views',path.resolve(__dirname,'views'));    
  
// //fetch the form data from request   
// app.use(bodyParser.urlencoded({extended:false}));    
    
// //test the database connection  
// sequelize    
//   .authenticate()    
//   .then(() => {    
//     console.log('Connection has been established successfully.');    
//   })    
//   .catch(err => {    
//     console.error('Unable to connect to the database:', err);    
//   });    
    
//   app.get('/',(req,res)=>{    
//    console.log('working')    
//   })    
    
//  //assign the port  
//   var port = process.env.PORT || 3000;    
//   app.listen(port,()=>console.log('server running at '+port));    
    
//   module.exports = app;  