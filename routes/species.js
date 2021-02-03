const speciesRouter = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  handleGetSpecies,
  handleGetOneSpecies,
} = require("../controllers/species");

speciesRouter.get("/", asyncHandler(handleGetSpecies));
speciesRouter.get("/:id", asyncHandler(handleGetOneSpecies));

module.exports = { speciesRouter };
