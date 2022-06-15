// Importes Modules
const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/user", userController.addUser);

// router.get('/user/:userId', authController.getUser);

// router.get('/user', authController.getAllUser);
router.put("/user/:id", userController.updateUser);

router.delete("/user/:id", userController.deleteUserById);

module.exports = router;
