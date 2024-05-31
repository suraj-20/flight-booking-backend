const Passenger = require("../models/passengerModel");

module.exports.addPassengerDetails = async (req, res) => {
  try {
    const { userId, passengers } = req.body;

    const passengerDocs = passengers.map((passenger) => ({
      ...passenger,
      userId,
    }));

    // console.log(passengerDocs);

    const newPassenger = await Passenger.insertMany(passengerDocs);

    // console.log(newPassenger);
    res.status(201).json({
      message: "Passenger added succesfully",
      passengers: newPassenger,
    });
  } catch (error) {
    console.error("Error in adding Passengers", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllPassengers = async (req, res) => {
  try {
    const allPassengers = await Passenger.find({});

    res.status(200).json({ message: "Get All Passengers", allPassengers });
  } catch (error) {
    console.error("Error in adding Passengers", error);
    res.status(400).json({ message: error.message });
  }
};
