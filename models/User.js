const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      max: 50,
    },
    password: {
      type: String,
      min: 6,
    },
    phone:{
      type: Number,
    },
    companyId:{
      type: String,
    },
    isadmin:{
      type:Boolean
    },
    token:{
      type: String,
    
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
