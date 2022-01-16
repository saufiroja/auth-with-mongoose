const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

exports.verifyUser = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(' ')[1];
    const result = jwt.verify(token, JWT_SECRET);
    req.user = result;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'unauthorized',
      code: 401,
      error,
    });
  }
};
