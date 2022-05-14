/* eslint-disable no-unused-expressions */
// const pool = require("../config/db");
// const createError = require("http-errors");
const productModel = require("../models/products");
const createError = require('http-errors')

exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit || 0;
    
    const sortBy = req.query.sortBy || `id`
    const sortOrder = req.query.sortOrder || `asc`
    const search = req.query.search || ``
    const result = await productModel.show({ limit, offset, sortBy, sortOrder, search });

    // logic pagination
    const { rows: [count] } = await productModel.countData();
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData / limit);
    // console.log(totalData);
    res.status(200).json({
      pagination: {
        currentPage: page,
        limit,
        totalData,
        totalPage
      },
      data: result
    });
  } catch {
    res.status(500).json({
      message: "internal server is error"
    });
  }
};
exports.insertProducts = (req, res, next) => {
  const { name, description, stock, price, id_category } = req.body;
  const data = {
    name, description, stock, price, id_category
  };
  productModel.insert({ name, description, stock, price, id_category })
    .then((result) => {
      res.status(201).json({
        message: "Data berhasil ditambahkan",
        data
      });
    })
    .catch(() => {
      next(createError(500, 'ada error di input anda'))
      // const error = new Error("internal server error");
      // error.status = 500;
      // next(error);
    });
},

exports.updateProducts = (req, res, next) => {
  const id = req.params.id;
  const { name, description, stock, price, id_category } = req.body;
  productModel.update(id, name, description, stock, price, id_category)
    .then((result) => {
      res.status(202).json({
        message: "Data berhasil di update"
      });
    })
    .catch(() => {
      next(createError(500, 'ada error di input anda'))
      // const error = new Error("internal server error");
      // error.status = 500;
      // next(error);
    });
},

exports.deleteProducts = (req, res, next) => {
  const id = req.params.id;
  productModel.deleteProd(id)
    .then((result) => {
      res.status(203).json({
        message: "Data berhasil di hapus"
      });
    })
    .catch(() => {
      next(createError(500, 'ada error di input parameter anda'))
      // const error = new Error("internal server error");
      // error.status = 500;
      // next(error);
    });
},

exports.detailProducts = (req, res) => {
  const id = req.params.id;
  productModel.getProductById(id)
    .then((result) => {
      res.status(203).json({
        data: result.rows
      });
    })
    .catch(() => {
      next(createError(500, 'ada error di input parameter anda'))
      // const error = new Error("internal server error");
      // error.status = 500;
      // next(error);
    });
};
