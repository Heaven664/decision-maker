const db = require('../connection');

const insertOption = (poll_id, title, description=null) => {
  const values = [poll_id, title, description];
  const queryString = `INSERT INTO options (poll_id, title, description) VALUES ($1, $2, $3) RETURNING *`;
  return db.query(queryString, values)
    .then(option => option.rows[0])
    .catch((err) => console.log(err.message))
};

const getOptions = (poll_id) => {
  const values = [ poll_id ];
  const queryString = `SELECT * FROM options WHERE poll_id = $1 ORDER BY id DESC`;
  return db.query(queryString, values)
    .then(option => option.rows)
    .catch((err) => console.log(err.message))
}

module.exports = { insertOption, getOptions };
