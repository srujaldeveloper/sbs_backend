require("dotenv").config();
require("./config/connection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Require Routes
app.use(
  "/api/",
  // require("./routes/user"),
  require("./routes/auth")
  // require("./routes/company"),
  // require("./routes/seller"),
  // require("./routes/currentstate"),
  // require("./routes/customer"),
  // require("./routes/category"),
  // require("./routes/status"),
  // require("./routes/project"),
  // require("./routes/costtype"),
  // require("./routes/template"),
  // require("./routes/pricelist"),
  // require("./routes/item")
);

// app.use('/uploads',express.static('uploads'));
// Baseurl
app.get("/", function (req, res) {
  res.send("Backend Running Success on Heroku");
});

// App Listing port
app.listen(PORT, function () {
  console.log("Listening on port " + PORT + ".");
});
