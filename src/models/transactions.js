const pool = require("../config/db");

const show = () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT transactions.*, products.price AS products_price FROM transactions INNER JOIN products ON transactions.name = products.name", (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(new Error(err));
        }
      });
    });
  };
  const insert = ({ name, total_order }) => {
    return new Promise((resolve, reject) => {
      pool.query("INSERT INTO transactions(name, total_order)VALUES($1, $2)", [name, total_order], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  };
  const update = ({name, total_order }) =>{
  return new Promise((resolve, reject)=>{
    pool.query("UPDATE transactions SET name = $2, total_order = $3 WHERE id = $1", [name, total_order], (err, result) => {   
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    })
  })
};

  const countData = () => {
    return pool.query("SELECT COUNT(*) AS total FROM transactions");
  };

  module.exports = {
      show,
      insert,
      update,
      countData
  };