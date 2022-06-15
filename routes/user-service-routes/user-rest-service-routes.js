// Importes Modules
const express = require("express");
const router = express.Router();

const {
  deleteUserById,
  // getAllUser,
  updateUser,
  // getUser,
  addUser,
} = require("../../controller/user-controller-service/user-rest-controller-service");
// routes
router.post("/user", addUser);
// router.get("/user/:userId", getUser);
// router.get("/user", getAllUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUserById);

// Module Exports
module.exports = router;
