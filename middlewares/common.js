   
// const createError = require('http-errors')

const myMiddle = (req, res, next) => {
  console.log('print helo world')
  // res.send('bla bal')
  next()
}

const validate = (req, res, next) => {
  const stock = req.body.stock

  if (stock < 1) {
    return res.json({
      message: 'stock harus lebih dari 0'
    })
  }
  next()
}

const myCors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
//   next(createError(500, 'ada salah di my cors'))
}

module.exports = {
  myMiddle,
  validate,
  myCors
}