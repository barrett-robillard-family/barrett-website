const mongoose = require('mongoose');

let dbSource = process.env.NODE_ENV === 'dev'
  ? process.env.DB_DEV_URL
  : process.env.DB_PROD_URL

mongoose.connect(dbSource, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.once('connected', () => {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
});