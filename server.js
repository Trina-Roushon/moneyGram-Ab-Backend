const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
db.sequelize.sync();
const app = express();

var corsOptions = {
  origin: ["http://10.11.201.69:4200", "http://10.11.200.85:4200"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '1024mb' }));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Money Gram Cash Payment API."
  });
});

require("./routes/money_gram_cash_payment_for_AB.routes")(app);
require("./routes/money_gram_cash_revised_transaction.routes")(app);

// set port, listen for requests
var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});