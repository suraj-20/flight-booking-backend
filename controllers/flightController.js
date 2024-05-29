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
        departureDate,
        arrivalDate,
        departureAirport,
        destinationAirport
      } = req.body

      const allFlights = await Flight.find({})

      const fliterFlight = allFlights.filter((flight)=>
        flight.departure_date.slice(0,10) === departureDate && 
        flight.arrival_date.slice(0,10) === arrivalDate && 
        flight.departure_location === departureAirport && 
        flight.arrival_location === destinationAirport 
      )


    res.status(200).json({ fliterFlight });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
