const Joi = require("joi");
const argon2 = require("argon2");
const db = require("../db");
const { RecordNotFoundError, ValidationError } = require("../error-types");
const definedAttributesToSqlSet = require("../helpers/definedAttributesToSQLSet.js");

const emailTest = async (email) => {
  const rows = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  if (rows.length) {
    return true;
  }
  return false;
};

const findByEmail = async (email, failIfNotFound = true) => {
  const rows = await db.query(`SELECT * FROM user WHERE email = ?`, [email]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError();
  return null;
};

// get user by id
const getOneUser = async (id, failIfNotFound = true) => {
  const rows = await db.query("SELECT * FROM user WHERE id = ?", [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError("users", id);
  return null;
};

// hashing password with argon2
const hashPassword = async (user) => argon2.hash(user.password);

// creating a user and hashing their password
const createUser = async (newAttributes) => {
  const { email } = newAttributes;
  const emailAlreadyExists = await emailTest(email);
  if (emailAlreadyExists) {
    throw new ValidationError(error.details);
  }

  const password = await hashPassword(newAttributes);
  const newObj = { ...newAttributes, password };
  const res = await db
    .query(`INSERT INTO user SET ${definedAttributesToSqlSet(newObj)}`, newObj)
    .catch((err) => {
      console.log(err);
      return false;
    });
  if (!res) {
    return false;
  }
  return { email, id: res.insertId };
};

// checking if the password is right thanks to argon2
const verifyPassword = async (user, plainPassword) => {
  return argon2.verify(user.password, plainPassword);
};

// get all users
const getUsers = async () => {
  return db.query("SELECT * FROM user");
};

/* const updateUser = async (id, newAttributes) => {
    let newObj = newAttributes;

  if (newAttributes.password) {
    const password = await hashPassword(newAttributes);
    newObj = { ...newAttributes, password };
  }

  const namedAttributes = definedAttributesToSQLSetNoNull(newObj);

  return db
    .query(`UPDATE user SET ${namedAttributes} WHERE id = :id`, {
      ...newObj,
      id,
    })
    .then(() => getOneUser(id));
}; */

const removeUser = async (id, failIfNotFound = true) => {
  const res = await db.query("DELETE FROM user WHERE id = ?", [id]);
  if (res.affectedRows !== 0) {
    return true;
  }
  if (failIfNotFound) throw new RecordNotFoundError("users", id);
  return false;
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  // updateUser,
  removeUser,
  verifyPassword,
  findByEmail,
};
