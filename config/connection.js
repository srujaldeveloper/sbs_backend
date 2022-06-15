const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const DB = process.env.DB_URL;
const connection = mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database Connected Success ${DB}`);
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = connection;
