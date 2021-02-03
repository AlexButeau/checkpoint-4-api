const Joi = require("joi");
// const argon2 = require("node_modules/argon2");
const db = require("../db");
const { RecordNotFoundError, ValidationError } = require("../error-types");
const definedAttributesToSqlSet = require("../helpers/definedAttributesToSQLSet.js");

// get species by id
const getOneSpecies = async (id, failIfNotFound = true) => {
  const rows = await db.query("SELECT * FROM species WHERE id = ?", [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError("species", id);
  return null;
};

// get all species
const getSpecies = async () => {
  return db.query("SELECT * FROM species");
};

module.exports = {
  getOneSpecies,
  getSpecies,
};
