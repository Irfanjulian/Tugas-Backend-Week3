// const pool = require("../config/db");
const categoryModel = require("../models/category");
const createError = require('http-errors')

exports.getCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const result = await categoryModel.select({ offset, limit });

    // logic pagination
    const { rows: [count] } = await categoryModel.countData();
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

exports.insertCategory = (req, res, next) => {
  const { id, name } = req.body;
  const data = {
    id,
    name
  };
  categoryModel.insert(data)
    .then(() => {
      res.status(201).json({
        data
      });
    })
    .catch(() => {
      next(createError(500, 'ada error di input anda'))
      // res.status(500).json({
      //   message: "internal server error"
      // });
      
    });
};

exports.updateCategory = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  pool.query("UPDATE category SET name = $1 WHERE id = $2", [name, id], (err, result) => {
    if (!err) {
      res.json({
        message: result
      });
    } else {
      next(createError(500, 'ada error di input anda'))
      // res.status(500).json({
      //   message: "internal server error"
      // });
    }
  });
};

exports.deleteCategory = (req, res, next) => {
  const id = req.params.id;
  categoryModel.deleteCategory(id)
    .then(() => {
      res.json({
        message: "data berhasil di hapus"
      });
    })
    .catch((error) => {
      next(createError(500, 'ada error di input parameter anda'))
    //   console.log(error);
    //   next(new Error());
    });
}
