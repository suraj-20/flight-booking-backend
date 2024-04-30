const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  departureAirport: {
    type: String,
    required: true,
  },
  destinationAirport: {
    type: String,
    required: true,
  },
  departureDateTime: {
    type: String,
  },
  arrivalDateTime: {
    type: String,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
  },
  class: {
    // Economy, Business, First class
    type: String,
    required: true,
  },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
