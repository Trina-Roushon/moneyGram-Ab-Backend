module.exports = app => {
    const moneyGramCRT = require("../controllers/money_gram_cash_revised_transaction.controller");
  
    var router = require("express").Router();
  
    router.post("/", moneyGramCRT.get);
    router.post("/exe", moneyGramCRT.reverse);

    app.use('/api/moneyGramCRT', router);
  };