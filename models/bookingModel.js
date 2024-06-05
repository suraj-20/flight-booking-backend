const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  title: { type: String},
  first_name: { type: String},
  last_name: { type: String},
  age:{type:String},
  gender:{type:String}
});

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    require:true
  },
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
  passengers: [passengerSchema],
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
