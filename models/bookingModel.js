const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    require: true,
  },
  passengers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Passenger",
      require: true,
    },
  ],
  amount: {
    type: Number,
  },
  paymentStatus: {
    type: String,
    default: "Pending",
  },
  bookingDate: {
    type: Date,
    require: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
