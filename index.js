require('dotenv').config()

const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 3000;
const transactionRouter = require('./routes/transaction.route');

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

const db = require("./models");
db.sequelize.sync();
app.use(cors());

app.use('/transactions', transactionRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

require("./routes/transaction.route");

app.listen(port, () => {
  console.log(`Example app listening sdfds at http://localhost:${port}`)
});