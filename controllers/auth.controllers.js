const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const { User } = require('../database/models/User.Models');

exports.signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const isExists = await User.find({ username, email });
    if (isExists) {
      return next(createError(400, 'username or email already exists'));
    }

    const user = await User.create({
      name,
      username,
      email,
      password,
    });

    return res.status(201).json({
      message: 'successfully signup user',
      code: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(400, 'invalid email'));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError(400, 'invalid password'));
    }

    return res.status(201).json({
      message: 'successfully login user',
      code: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
};
