const Flight = require("../models/flightModel");
const crypto = require("crypto");

const generateFlightId = () => {
  return crypto.randomBytes(3).toString("hex");
};

module.exports.addFlightDetails = async (req, res) => {
  try {
    const {
      airline,
      departureAirport,
      destinationAirport,
      departureDateTime,
      arrivalDateTime,
      class_of_service,
      price,
      availableSeats,
    } = req.body;

    console.log(req.body);
    const flights = await Flight.find({});
    if (!flights) {
      return res.status(400).json({ message: "Flights not found!" });
    }

    const flight_id = generateFlightId().substring(0, 5);

    const flight = new Flight({
      airline,
      departure_location: departureAirport,
      arrival_location: destinationAirport,
      departure_date: departureDateTime,
      arrival_date: arrivalDateTime,
      available_seats: availableSeats,
      flight_number: flight_id,
      price,
      class_of_service,
    });

    const newFlight = await flight.save();
    res.status(201).json({ message: "Flight Added sucessfully", newFlight });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllFlight = async (req, res) => {
  try {
    const allFlights = await Flight.find();
    res.status(200).json(allFlights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.searchFlights = async (req, res) => {
  try {
    const {
      departureDate,
      arrivalDate,
      departureAirport,
      destinationAirport,
      class_of_service,
    } = req.body;

    const allFlights = await Flight.find({});

    if (!allFlights) {
      return res.status(400).json({ message: "Record not found!" });
    }

    const fliterFlight = allFlights.filter(
      (flight) =>
        flight.departure_date.slice(0, 10) === departureDate &&
        flight.arrival_date.slice(0, 10) === arrivalDate &&
        flight.departure_location === departureAirport &&
        flight.arrival_location === destinationAirport &&
        flight.class_of_service === class_of_service
    );

    res.status(200).json({ fliterFlight });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
