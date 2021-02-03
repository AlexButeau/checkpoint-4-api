require("dotenv").config();
// const nodemailer = require("nodemailer");

const {
  getUsers,
  getOneUser,
  createUser,
  // updateUser,
  removeUser,
} = require("../models/users.js");

module.exports.handleGetUsers = async (_req, res) => {
  const rawData = await getUsers();
  return res.status(200).send(rawData);
};

module.exports.handleGetOneUser = async (req, res) => {
  res.send(await getOneUser(req.params.id));
};

module.exports.handleCreateUser = async (req, res) => {
  // const picture_url = req.file ? req.file.path : null;
  const { birthdate, firstname, lastname, email, tel, password } = req.body;

  const userData = await createUser({
    birthdate,
    firstname,
    lastname,
    email,
    tel,
    password,
  });

  return res.status(201).json(userData);
};

module.exports.handleDeleteUser = async (req, res) => {
  await removeUser(req.params.id);
  res.sendStatus(204);
};
