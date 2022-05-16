const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { findByEmail, create } = require("../models/users");
const commonHelper = require("../helper/common");

const register = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    const { rowCount } = await findByEmail(email);
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    console.log(passwordHash);
    if (rowCount) {
      return next(createError(403, "User sudah terdaftar"));
    }
    const data = {
      id: uuidv4(),
      email,
      password: passwordHash,
      fullName
    };
    await create(data);
    commonHelper.response(res, null, 201, "user berhasil register");
  } catch (error) {
    console.log(error);
    next(new createError.InternalServerError());
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const { rows: [user] } = await findByEmail(email);
  // const user = rows[0]
  if (!user) {
    return commonHelper.response(res, null, 403, "email atau password salah");
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return commonHelper.response(res, null, 403, "email atau password salah");
  }
  delete user.password;
  delete user.id;
  commonHelper.response(res, user, 201, "anda berhasil login");
};

module.exports = {
  register,
  login
};
