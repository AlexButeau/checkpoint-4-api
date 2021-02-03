// const Joi = require("joi");
// const argon2 = require("node_modules/argon2");
const db = require("../db");
const { RecordNotFoundError, ValidationError } = require("../error-types");
const definedAttributesToSqlSet = require("../helpers/definedAttributesToSQLSet.js");

// get ride by id
const getOneRide = async (id, failIfNotFound = true) => {
  const rows = await db.query("SELECT * FROM ride WHERE id = ?", [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError("rides", id);
  return null;
};

const linkRideToSpecies = async (rideId, speciesArray) => {
  let valuePairsString = "";
  let result;
  if (speciesArray !== undefined) {
    if (speciesArray.length > 0) {
      valuePairsString = "";
      speciesArray.forEach((species) => {
        valuePairsString += `(${+rideId}, ${+species}),`; // + to convert it to number or make sure it's a number
      });
      valuePairsString = valuePairsString.slice(0, -1); // removing the last comma
      result = await db
        .query(
          `INSERT INTO rideToSpecies (ride_id, species_id) VALUES ${valuePairsString};`
        )
        .catch(() => {
          return false;
        });
    }

    if (result === false) {
      throw new ValidationError([
        {
          message: "there was a problem to link the ride to accepted species",
          path: ["rideToSpecies"],
          type: "insertionError",
        },
      ]);
    }
  }
};

// creating a ride
const createRide = async (newAttributes) => {
  const res = await db
    .query(
      `INSERT INTO ride SET ${definedAttributesToSqlSet(newAttributes)}`,
      newAttributes
    )
    .catch((err) => {
      console.log(err);
      return false;
    });
  if (!res) {
    return false;
  }
  return { id: res.insertId };
};

// get all users
const getRides = async () => {
  return db.query("SELECT * FROM ride");
};

const removeRide = async (id, failIfNotFound = true) => {
  const res = await db.query("DELETE FROM ride WHERE id = ?", [id]);
  if (res.affectedRows !== 0) {
    return true;
  }
  if (failIfNotFound) throw new RecordNotFoundError("ride", id);
  return false;
};

module.exports = {
  getRides,
  getOneRide,
  createRide,
  removeRide,
  linkRideToSpecies,
};
