const express = require("express");
const {
  addFligths,
  getFlightDetails,
} = require("../controllers/flightController");

const router = express.Router();

router.post("/flights", addFligths);
router.get("/flights", getFlightDetails);

module.exports = router;
