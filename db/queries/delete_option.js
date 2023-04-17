const db = require("../connection");

const deleteOption = function (queryParams) {
  const queryString = `
    DELETE FROM options
    WHERE id = $1;
  `;

  return db
    .query(queryString, queryParams)
    .catch((err) => console.log(err.message));
};

module.exports = { deleteOption };
