const express = require("express");
const {
  addFligths,
  getFlightDetails,
  searchFlights,
} = require("../controllers/flightController");

const router = express.Router();

router.post("/flights", addFligths);
router.get("/flights", getFlightDetails);
router.post("/search", searchFlights);

module.exports = router;
