require("dotenv").config();

const {
  getRides,
  getOneRide,
  createRide,
  linkRideToSpecies,
  removeRide,
} = require("../models/rides.js");

module.exports.handleGetRides = async (req, res) => {
  const { start_city, arrival_city } = req.query; // getting the filters from the url

  const rawData = await getRides({ start_city, arrival_city });
  return res.status(200).send(rawData);
};

module.exports.handleGetOneRide = async (req, res) => {
  res.send(await getOneRide(req.params.id));
};

module.exports.handleCreateRide = async (req, res) => {
  // const picture_url = req.file ? req.file.path : null;
  const {
    start_city,
    start_zipcode,
    start_address,
    start_date,
    start_time,
    arrival_city,
    arrival_zipcode,
    arrival_address,
    transport_id,
    user_id,
    comment,
    accepted_species_array,
  } = req.body;

  const rideData = await createRide({
    start_city: start_city.toUpperCase(),
    start_zipcode,
    start_address,
    start_date,
    start_time,
    arrival_city: arrival_city.toUpperCase(),
    arrival_zipcode,
    arrival_address,
    transport_id,
    user_id,
    comment,
  });

  const insertedRideId = rideData.id;

  await linkRideToSpecies(insertedRideId, accepted_species_array);

  return res.status(201).json(rideData);
};

module.exports.handleDeleteRide = async (req, res) => {
  await removeRide(req.params.id);
  res.sendStatus(204);
};
