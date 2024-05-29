const mongoose = require("mongoose");

const flightSearchSchema = new mongoose.Schema({
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
    type: Date,
    required: true,
  },
  return_date: {
    type: Date,
  },
  passengers: {
    type: Number,
    required: true,
    min: 1,
  },
  class_of_service: {
    type: String,
    required: true,
    enum: ["Economy", "Premium Economy", "Business", "First"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  search_date: {
    type: Date,
    default: Date.now,
  },
  flights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
    },
  ],
});
