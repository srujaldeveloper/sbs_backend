// const db = require("../models");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
;

//user 
exports.addUser = async (req, res) => {
    console.log("call")
    try { 
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        //check email exist or not
        let userExist = await User.findOne({ email: req.body.email })
        if (userExist !==null && Object.keys(userExist) !== 0) {
          res.status(200).json({
            status: 409,
            message: "User address exist"
          });
        }
        else {
          //create new user
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone:req.body.phone,
            companyId:req.body.companyId,
            isadmin:false,
          });
          const user = await newUser.save();
          res.status(200).send({
            message: "Successfully Add",
            user,
          })
        
        }
    
      } catch (err) {
        res.status(500).json(err)
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
//update user
exports.updateUser = async (req, res) => {
  if (!req.body) {
      return res.status(400).send({
          message: "Data to update can not be empty!"
      });
  }
  console.log("req.body",req.body)
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        User.findById(id).then(response=>{
          if (!response) {
            res.status(404).send({
                status: 404,
                message: `Cannot update user with id=${id}. Maybe user was not found!`
            });
        } else res.send(response)
        })
         
      })
      .catch(err => {
          res.status(500).send({
              status: 500,
              message: "Error updating user with id=" + id
          });
      });
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



// delete user
exports.deleteUserById = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          status: 404,
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      } else {
        res.send({
          status: 200,
          message: "user was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 500,
        message: "Could not delete user with id=" + id
      });
    });
};