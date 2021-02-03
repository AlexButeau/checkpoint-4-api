const { userRouter } = require("./users");
const { speciesRouter } = require("./species");
const { rideRouter } = require("./rides");
const { transportRouter } = require("./transport");

// eslint-disable-next-line
module.exports = (app) => {
  app.use("/users", userRouter);
  app.use("/species", speciesRouter);
  app.use("/rides", rideRouter);
  app.use("/transport", transportRouter);
};
