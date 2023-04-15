const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection succesful'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Up and running on port ${PORT}...`);
});