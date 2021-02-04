const emailRouter = require("express").Router();
const asyncHandler = require("express-async-handler");
const requireRequestBody = require("../middlewares/requireRequestBody");

const { handleSendEmail } = require("../controllers/sendEmail.js");

emailRouter.post("/", requireRequestBody, asyncHandler(handleSendEmail));

module.exports = { emailRouter };
