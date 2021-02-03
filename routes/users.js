const userRouter = require("express").Router();
const asyncHandler = require("express-async-handler");
const {
  handleGetUsers,
  handleGetOneUser,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
  handleLogin,
} = require("../controllers/users");

// const requireRequestBody = require("../middlewares/requireRequestBody.js");
// const requireIsAdmin = require("../middlewares/requireAdmin");
// const mainUploadImage = require("../middlewares/handleImageUpload");

userRouter.get("/", asyncHandler(handleGetUsers));
userRouter.get("/:id", asyncHandler(handleGetOneUser));
userRouter.post("/", asyncHandler(handleCreateUser));
userRouter.put("/:id", asyncHandler(handleUpdateUser));
userRouter.delete("/:id", asyncHandler(handleDeleteUser));

userRouter.post("/", asyncHandler(handleLogin));

module.exports = { userRouter };
