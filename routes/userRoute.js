const express = require("express");
const {
  handleUserRegister,
  handleUserLogin,
  handleUserUpdate,
} = require("../controllers/userController");
const router = express.Router();

router.post("/user/register", handleUserRegister);
router.post("/user/login", handleUserLogin);
router.put("/user/updateInfo", handleUserUpdate);

module.exports = router;
