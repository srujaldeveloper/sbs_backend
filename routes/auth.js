// Importes Modules
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const { uploadFile } = require("../middleware/multer");

const {
  register,
  login,
  getUser,
  getAllUser,
} = require("../controller/auth.controller");

router.post(
  "/register",
  uploadFile.single("profilePicture"),
  authController.register
);

router.post("/login", authController.login);

router.get("/user/:userId", authController.getUser);

router.get("/user", authController.getAllUser);

module.exports = router;
