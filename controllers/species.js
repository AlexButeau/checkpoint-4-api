require("dotenv").config();

const { getSpecies, getOneSpecies } = require("../models/species.js");

module.exports.handleGetSpecies = async (_req, res) => {
  const rawData = await getSpecies();
  return res.status(200).send(rawData);
};

module.exports.handleGetOneSpecies = async (req, res) => {
  res.send(await getOneSpecies(req.params.id));
};
