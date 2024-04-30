const Flight = require("../models/flightModel");

module.exports.addFligths = async (req, res) => {
  const {
    airline,
    departureAirport,
    destinationAirport,
    departureDateTime,
    arrivalDateTime,
    duration,
    price,
    availableSeats,
  } = req.body;

  const flights = await Flight.find({});
  let id;

  if (flights.length > 0) {
    const last_flight_array = flights.splice(-1);
    const last_flight = last_flight_array[0];
    id = last_flight.id + 1;
  } else {
    id = 1;
  }

  const flight = new Flight({
    id: id,
    airline,
    departureAirport,
    destinationAirport,
    departureDateTime,
    arrivalDateTime,
    duration,
    price,
    availableSeats,
    class: req.body.class,
  });

  try {
    const newFlight = await flight.save();
    res.status(201).json({ message: "Flight Added sucessfully", newFlight });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.getFlightDetails = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
