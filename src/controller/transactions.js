const transactionsModel = require("../models/transactions");

exports.getTransactions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const result = await transactionsModel.show();

    // logic pagination
    const { rows: [count] } = await transactionsModel.countData()
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData);
    // console.log(totalData);
    res.status(200).json({
      pagination: {
        currentPage: page,
        totalData,
        totalPage
      },
      data: result
    });
  } catch {
    res.status(500).json({
      message: "internal server error"
    });
  }
};
exports.insertTransactions = (req, res, next) => {
  const { name, total_order } = req.body;
  const data = {
    name, total_order
  };
  transactionsModel.insert({ name, total_order })
    .then((result) => {
      res.status(201).json({
        message: "Data berhasil ditambahkan",
        data
      });
    })
    .catch(() => {
      const error = new Error("internal server error");
      error.status = 500;
      next(error);
    });
},
exports.updateTransactions = (req, res) => {
  const id = req.params.id;
  const data = {
    id,
    name,
    total_order
  };
  transactionsModel.update(data)
    .then(() => {
      res.status(202).json({
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
  // insertTransactions: (req, res, next) => {
  //   const { name, total_order } = req.body;
  //   pool.query("INSERT INTO transactions(name, total_order)VALUES($1, $2)", [name, total_order], (err, result) => {
  //     if (!err) {
  //       res.json({
  //         message: "Data berhasil ditambahkan",
  //         result
  //       });
  //     } else {
  //       res.json({
  //         message: "internal server error"
  //       });
  //     }
  //   });
  // },
  // updateTransactions: (req, res, next) => {
  //   const { name, total_order } = req.body;
  //   const id = req.params.id;
  //   pool.query("UPDATE transactions SET name = $2, total_order = $3 WHERE id = $1", [id, name, total_order], (err, result) => {
  //     if (!err) {
  //       const result = {
  //         id,
  //         name,
  //         description,
  //         stock,
  //         price,
  //         id_category
  //       };
  //       return result;
  //     } else {
  //       return item;
  //     }
  //   });
  //   res.json({
  //     message: "Data berhasil di ubah"
  //   });
  // },
  // deleteTransactions: (req, res, next) => {
  //   const id = req.params.id;
  //   pool.query("DELETE FROM transactions WHERE id = $1", [id])
  //     .then((result) => {
  //       res.json({
  //         message: "Data berhasil di hapus",
  //         data: result.rows
  //       });
  //     })
  //     .catch((error) => {
  //       res.json({
  //         message: "internal server error"
  //       });
  //     });

// module.exports = transactionsController;
