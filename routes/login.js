const frontLogin = require("express").Router();
const asyncHandler = require("express-async-handler");
const requireRequestBody = require("../middlewares/requireRequestBody");

const {
  // handleLogout,
  handleLoginNormalUser,
} = require("../controllers/login.js");

frontLogin.post("/", requireRequestBody, asyncHandler(handleLoginNormalUser));

module.exports = { frontLogin };
