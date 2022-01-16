require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// CONNECTION DATABASE
require('./database/config');

// IMPORT ROUTERS
const authRouters = require('./routers/auth.routers');

// MIDDLEWARES
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTERS
app.use('/api', authRouters);

app.use((err, req, res, next) => {
  const { message, code = 500, error = 'internal server error' } = err;
  return res.status(code).json({
    message,
    code,
    error,
  });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`connect on port ${PORT}`);
});
