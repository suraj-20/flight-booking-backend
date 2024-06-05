const express = require("express");
const {
  searchFlights,
  getAllFlight,
  addFlightDetails,
} = require("../controllers/flightController");
const {
  addPassengerDetails,
  getAllPassengers,
} = require("../controllers/passengerController");
const fetchUser = require("../middlewares/userAuthentication");
const { createPayment, capturePayment , getAllUserPrevFlight} = require("../controllers/payment");

const router = express.Router();

router.post("/addFlightDetails", addFlightDetails);
router.get("/getAllFlight", getAllFlight);
router.post("/searchFlights", searchFlights);
router.post("/addPassengerDetails", fetchUser, addPassengerDetails);
router.get("/getAllPassengers", getAllPassengers);
router.post("/createPayment", fetchUser, createPayment);
router.get("/getAllUserPrevFlight", fetchUser, getAllUserPrevFlight);
// router.post("/capturePayment", capturePayment);

module.exports = router;
