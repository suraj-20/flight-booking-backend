const Flight = require("../models/flightModel");
const FlightSearch = require("../models/flightSearch");

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
    flightNumber
  } = req.body;


  console.log(req.body)
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
    departure_location: departureAirport,
    arrival_location : destinationAirport ,
    departure_date: departureDateTime,
    arrival_date: arrivalDateTime,
    available_seats : availableSeats,
    flight_number: flightNumber,
    price,
    duration,
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

module.exports.searchFlights = async (req, res) => {
  try {
    const {
      departure_location,
      arrival_location,
      departure_date,
      return_date,
      passengers,
      class_of_service,
      user_id,
    } = req.query;
    const searchCriteria = {};

    if (departure_location) {
      searchCriteria.departure_location = departure_location;
    }
    if (arrival_location) {
      searchCriteria.arrival_location = arrival_location;
    }
    if (departure_date) {
      searchCriteria.departure_date = new Date(departure_date);
    }
    if (return_date) {
      searchCriteria.return_date = new Date(return_date);
    }
    if (class_of_service) {
      searchCriteria.class_of_service = class_of_service;
    }

    const flights = await Flight.find(searchCriteria);
    const flightIds = flights.map((flight) => flight._id);

    const flightSearch = new FlightSearch({
      departure_location,
      arrival_location,
      departure_date: new Date(departure_date),
      return_date: return_date ? new Date(return_date) : null,
      passengers,
      class_of_service,
      user: user_id,
      flights: flightIds,
    });

    await flightSearch.save();
    res.status(200).json({ flights });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
