const Flight = require("../models/flightModel");
const Passenger = require("../models/passengerModel");
const razorpay = require("../services/razorpay");
const Booking = require("../models/bookingModel");
const { v4: uuidv4 } = require('uuid');
const { ObjectId } = require('mongoose')


module.exports.createPayment = async (req, res) => {
  try {

    const userId = req.userId;
    const {selectedFlight, passengerDetails} = req.body
    const {_id:flightId, price} = selectedFlight

    const data = {
      bookingId : uuidv4(),
      userId ,
      flightId ,
      passengers : [...passengerDetails],
      amount: price,
      paymentStatus: "paid",
      bookingDate: new Date().toISOString()
    }


    const response = await Booking.create(data)
    console.log(response)

    res.status(201).json({ message: "Payment sucessfull", response });


  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
};


module.exports.getAllUserPrevFlight = async (req, res) => {
  try {
    
    const userId = req.userId;

    const bookings = await Booking.find({})
    

    const targetUserId = `${userId}`;


    const filteredBookings = bookings.filter(booking => booking.userId.equals(targetUserId));
    
    res.status(200).json({ message: "Flight fetched successfully", filteredBookings });
  } catch (error) {
    console.error("Error in getAllFlights: ", error);
    res.status(500).json({ message: error.message });
  }
};
