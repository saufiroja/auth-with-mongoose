const mongoose = require('mongoose');

const { DB_NAME } = process.env;

mongoose.connect(DB_NAME).then(() => {
  console.log('connect on database');
});
