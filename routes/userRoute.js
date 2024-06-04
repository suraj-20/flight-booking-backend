const express = require("express");
const {
  handleUserRegister,
  handleUserLogin,
  handleUserUpdate,
  handleGetUserDetails,
} = require("../controllers/userController");
const fetchUser = require("../middlewares/userAuthentication");
const router = express.Router();

router.post("/user/register", handleUserRegister);
router.get("/user", fetchUser, handleGetUserDetails);
router.post("/user/login", handleUserLogin);
router.put("/user/updateInfo", handleUserUpdate);

module.exports = router;
