const rideRouter = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  handleGetRides,
  handleGetOneRide,
  handleCreateRide,
  handleDeleteRide,
} = require("../controllers/rides");

// const requireRequestBody = require("../middlewares/requireRequestBody.js");
// const requireIsAdmin = require("../middlewares/requireAdmin");
// const mainUploadImage = require("../middlewares/handleImageUpload");

rideRouter.get("/", asyncHandler(handleGetRides));
rideRouter.get("/:id", asyncHandler(handleGetOneRide));
rideRouter.post("/", asyncHandler(handleCreateRide));
rideRouter.delete("/:id", asyncHandler(handleDeleteRide));

module.exports = { rideRouter };
