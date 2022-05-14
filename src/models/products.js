const pool = require("../config/db");

const getProductById = (id) => {
  return pool.query("SELECT products.*, category.name AS category_name FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id = $1", [id]);
};
const show = ({ limit, offset, sortBy, sortOrder, search }) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM products WHERE (name) ILIKE ('%${search}%') ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (!err) {
        resolve(result.rows);
      } else {
        reject(new Error(err));
      }
    });
  });
};
const insert = ({ name, description, stock, price, id_category }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO products(name, description, stock, price, id_category)VALUES($1, $2, $3, $4, $5)", [name, description, stock, price, id_category], (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};
const update = (name, description, stock, price, id_category) => {
  return new Promise((resolve, reject) => {
    pool.query("UPDATE products SET name = $1, description = $2, stock = $3, price = $4, id_category = $5", [name, description, stock, price, id_category], (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};
const deleteProd = (id) => {
  return new Promise((resolve, reject)=>{
    pool.query("DELETE FROM products WHERE id = $1", [id]);
    if(!err){
    resolve(result);
    }else{
      reject(new Error(err));
    }
  })
};
const countData = () => {
  return pool.query("SELECT COUNT(*) AS total FROM products");
};

module.exports = {
  getProductById,
  countData,
  show,
  insert,
  update,
  deleteProd
};
