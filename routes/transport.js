const transportRouter = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  handleGetTransport,
  handleGetOneTransport,
} = require("../controllers/transport");

transportRouter.get("/", asyncHandler(handleGetTransport));
transportRouter.get("/:id", asyncHandler(handleGetOneTransport));

module.exports = { transportRouter };
