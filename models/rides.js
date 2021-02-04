// const Joi = require("joi");
// const argon2 = require("node_modules/argon2");
const db = require("../db");
const { RecordNotFoundError, ValidationError } = require("../error-types");
const definedAttributesToSqlSet = require("../helpers/definedAttributesToSQLSet.js");
const { getTransport } = require("./transport");
const { getSpecies } = require("./species");
const dayjs = require("dayjs");

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
const getRides = async ({ start_city, arrival_city }) => {
  const today = dayjs().format("YYYY-MM-DD");

  let query =
    "SELECT ride.*, user.firstname as user_firstname, user.lastname as user_lastname, GROUP_CONCAT(RTS.species_id) as species_id_concat FROM ride INNER JOIN user ON ride.user_id = user.id LEFT JOIN rideToSpecies as RTS ON RTS.ride_id = ride.id WHERE start_date > ?";

  const filterArray = [];

  if (start_city !== undefined || arrival_city !== undefined) {
    query += " AND ";
    if (start_city !== undefined && arrival_city !== undefined) {
      query += `start_city LIKE ? AND arrival_city LIKE ?`;
      filterArray.push(`%${start_city}%`);
      filterArray.push(`%${arrival_city}%`);
    } else if (start_city !== undefined) {
      query += `start_city LIKE ?`;
      filterArray.push(`%${start_city}%`);
    } else if (arrival_city !== undefined) {
      query += `arrival_city LIKE ?`;
      filterArray.push(`%${arrival_city}%`);
    }
  }
  query +=
    " GROUP BY ride.id ORDER BY ride.start_date ASC, ride.start_time ASC;";

  const ridesList = await db.query(`${query}`, [today, ...filterArray]);

  const transportList = await getTransport();
  const speciesList = await getSpecies();

  const result = ridesList.map((ride) => {
    const acceptedSpeciesArray = ride.species_id_concat
      .split(",")
      .map((number) => +number); // array like [1, 3]

    const transport_name = transportList
      .filter((transport) => transport.id === ride.transport_id)
      .map((transport) => transport.transport)[0]; // should be "car" or "bus" etc

    const acceptedSpeciesNameArray = speciesList
      .filter((species) => acceptedSpeciesArray.includes(species.id))
      .map((species) => species.species);

    return { ...ride, transport_name, acceptedSpeciesNameArray };
  });

  return result;
};

/* [
  {
    id: 2,
  
    transport_id: 1,

    species_id_concat: "1,3",
  },
];
 */

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
