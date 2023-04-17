const db = require('../connection');

const createPoll = (email, title, description) => {
  const values = [email, title, description];
  const queryString = `INSERT INTO polls (email, title, description) VALUES ($1, $2, $3) RETURNING id`;
  return db.query(queryString, values)
    .then(poll => poll.rows[0].id)
    .catch((err) => console.log(err.message))
};

const addLinks = (admin_link, vote_link, id) => {
  const values = [admin_link, vote_link, id];
  const queryString = `UPDATE polls SET admin_link = $1, vote_link = $2 WHERE id = $3 RETURNING id`;
  return db.query(queryString, values)
    .then(data => data.rows[0].id)
    .catch((err) => console.log(err.message))
}

module.exports = { createPoll, addLinks };
