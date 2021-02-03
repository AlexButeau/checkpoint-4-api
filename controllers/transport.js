require("dotenv").config();

const { getTransport, getOneTransport } = require("../models/transport.js");

module.exports.handleGetTransport = async (_req, res) => {
  const rawData = await getTransport();
  return res.status(200).send(rawData);
};

module.exports.handleGetOneTransport = async (req, res) => {
  res.send(await getOneTransport(req.params.id));
};
