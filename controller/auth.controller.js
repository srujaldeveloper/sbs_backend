// const db = require("../models");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//REGISTER
exports.register = async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //check email exist or not
    let userExist = await User.findOne({ email: req.body.email })
    if (userExist !==null && Object.keys(userExist) !== 0) {
      res.status(200).json({
        status: 409,
        message: "Email address exist"
      });
    }
    else {
      //create new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        // profilePicture: req.body.profilePicture ? req.body.profilePicture : req.file.originalname
      });
      console.log("newUser", newUser)
      const user = await newUser.save();
      res.status(200).json({
        status: 200,
        user
      });
    }

  } catch (err) {
    res.status(500).json(err)
  }
};

//LOGIN
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  console.log("useruser",user)
  !user && res.send({ status: 404, message: "Invalid Credentials" })
  const token = jwt.sign({ Id: res._id }, process.env.SECRET_JWT, {
    expiresIn: "24h",
  });
  if(user!==null){
    const validPassword = await bcrypt.compare(req.body.password, user?.password)
    if (!validPassword) {
      return res.send({
        status: 400,
        message: "wrong password"
      })
    }
    else {
      user.token = token
      return res.send({
        status: 200,
        message: "Successfully Login",
         user,
      })
    }
  }
};

//get a user by id
exports.getUser = async (req, res) => {
  const userId = req.params.userId;
  const username = req.params.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get all user
exports.getAllUser = async (req, res) => {
  try {
    if (req.query.username) {
      await User.find({ username: req.query.username.toLowerCase() }).then(data => {
        if (data) {
          res.status(200).send(data);
        }
      })
    }
    else {
      await User.find().then(data => {
        if (data) {
          res.status(200).send(data);
        }
      })
    }

  } catch (err) {
    res.status(500).json(err);
  }
};

//search user 

exports.searchUser = async (req, res) => {
  try {
    User.find({ username: req.params.username }).then(data => {
      console.log("dataa", data)
      if (data) {
        res.status(200).send(data);
      }
    })
  } catch (err) {
    res.status(500).json(err);
  }
};

