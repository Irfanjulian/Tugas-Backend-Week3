const pool = require("../config/db");
const select = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM category LIMIT $1 OFFSET $2", [limit, offset], (err, result) => {
      if (!err) {
        resolve(result.rows);
      } else {
        reject(new Error(err));
      }
    });
  });
};

const insert = ({ id, name }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO category(id, name)VALUES($1, $2)", [id, name], (err, result) => {
      if (!err) {
        resolve(result.rows);
      } else {
        reject(new Error(err));
      }
    });
  });
};

const deleteData = (id) => {
  // eslint-disable-next-line no-return-assign
  return pool.query = ("DELETE FROM category WHERE id = $1", [id]);
};

const countData = () => {
  return pool.query("SELECT COUNT(*) AS total FROM category");
};

module.exports = {
  select,
  insert,
  deleteData,
  countData
};
