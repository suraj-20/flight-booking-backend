const Flight = require("../models/flightModel");
const Passenger = require("../models/passengerModel");
const razorpay = require("../services/razorpay");
const Booking = require("../models/bookingModel");

module.exports.createPayment = async (req, res) => {
  try {
    const { userId, flightId, passengerIds } = req.body;

    const paymentStatus = await simulatePayment();

    if (!paymentStatus) {
      return res.status(500).json({ message: "Payment failed" });
    }

    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(500).json({ message: "Flight not found" });
    }

    if (flight.available_seats < passengerIds.length) {
      return res.status(500).json({ message: "Not enough available seats" });
    }

    flight.available_seats -= passengerIds.length;
    await flight.save();

    const passengers = await Passenger.find({ _id: { $in: passengerIds } });

    if (passengers.length !== passengerIds.length) {
      return res
        .status(404)
        .json({ message: "One or more passengers not found" });
    }

    // Calculate total amound based on flight price
    const totalAmount = calculateTotalAmount(flight.price, passengers.length);

    const booking = new Booking({
      userId,
      flightId,
      passengers: passengerIds,
      amount: totalAmount,
      paymentStatus: "Paid",
      bookingDate: new Date(),
    });

    const newBooking = await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking: ", error);
    res.status(500).json({ message: error.message });
  }
};

async function simulatePayment() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

function calculateTotalAmount(flightPrice, numPassengers) {
  return flightPrice * numPassengers;
}

module.exports.capturePayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const isValidSignature = razorpay.utility.verifyPaymentSignature({
      orderId,
      paymentId,
      signature,
    });

    if (!isValidSignature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const captureResponse = await razorpay.payments.capture(paymentId, orderId);

    if (captureResponse.status !== "captured") {
      return res.status(500).json({ message: "Payment capture failed" });
    }

    const booking = await Booking.findOneAndUpdate(
      { orderId },
      { $set: { status: paid } },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Payment captured successfully", booking });
  } catch (error) {
    console.error("Error creating booking: ", error);
    res.status(500).json({ message: error.message });
  }
};
