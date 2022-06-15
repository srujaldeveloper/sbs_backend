const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const dotenv = require("dotenv").config();
app.use(express.static(__dirname + '/public/images'));

const cors = require("cors");
const PORT = process.env.PORT || 8000;




app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// // app.use('/uploads',express.static('uploads'));
const db = require('./models')
mongoose.connect(
    db.url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to MongoDB");
    }
);

require("./routes/user")(app);
require("./routes/auth")(app);
require("./routes/company")(app);
require("./routes/seller")(app);
require("./routes/currentstate")(app);
require("./routes/customer")(app);
require("./routes/category")(app);
require("./routes/status")(app);
require("./routes/project")(app);
require("./routes/costtype")(app);
require("./routes/template")(app);
require("./routes/pricelist")(app);
require("./routes/item")(app);
require("./routes/projectdescription")(app);
require("./routes/projectLabel")(app);
require("./routes/pricelistcategory")(app);
require("./routes/textcategory")(app);
require("./routes/image")(app);


app.get("/", function(req,res){
  res.send("Working")
})


app.listen(PORT, function () {
    console.log("Listening on port " + PORT + ".");
  });