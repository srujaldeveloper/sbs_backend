// Importes Modules
const express = require("express");
const router = express.Router();

const authController = require("../../controller/auth.controller");
const { uploadFile } = require('../../middleware/multer')

const {
    getAllUser,
    // searchUser,
    register,
    getUser,
    login,
} = require("../../controller/user-controller-service/user-auth-controller-service");

// routes
router.post("/register", uploadFile.single('profilePicture'), register);

router.post("/login", login);

router.get('/user/:userId', getUser);

router.get('/user', getAllUser);

// Module Exports
module.exports = router;
