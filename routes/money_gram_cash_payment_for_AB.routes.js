module.exports = app => {
    const apiCashPaymentMG = require("../controllers/money_gram_cash_payment_for_AB.controller");
  
    var router = require("express").Router();

    router.post("/", apiCashPaymentMG.create);
    router.post("/acc", apiCashPaymentMG.account);

    app.use('/api/apiCashPaymentMG', router);
  };