const db = require("../db");
const { RecordNotFoundError, ValidationError } = require("../error-types");

// get transport by id
const getOneTransport = async (id, failIfNotFound = true) => {
  const rows = await db.query("SELECT * FROM transport WHERE id = ?", [id]);
  if (rows.length) {
    return rows[0];
  }
  if (failIfNotFound) throw new RecordNotFoundError("transport", id);
  return null;
};

// get all species
const getTransport = async () => {
  return db.query("SELECT * FROM transport");
};

module.exports = {
  getOneTransport,
  getTransport,
};
