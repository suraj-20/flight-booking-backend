const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  flight_number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  departure_location: {
    type: String,
    required: true,
    trim: true,
  },
  arrival_location: {
    type: String,
    required: true,
    trim: true,
  },
  departure_date: {
    type: String,
    required: true,
  },
  arrival_date: {
    type: String,
    required: true,
  },
  available_seats: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
