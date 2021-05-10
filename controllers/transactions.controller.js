const db = require("../models"); // models path depend on your structure
const Transaction = db.transactions;
var moment = require('moment');

/**
 * 
 * @param: Object req 
 * @param: Object res 
 * @returns: Returns the list of available transactions 
 */
async function create(req, res) {
  // Validate request
  if (!req.body.transaction_type) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  let balance = await calculateBalance(); // get the balance left
  let amount = parseFloat(req.body.amount);

  balance = req.body.transaction_type === 'credit' ? balance + amount : balance - amount;

  if (balance < 0) {
    res.status(400).send({
      message: "Debit amount cannot be greater than balance."
    });
    return;
  }

  // Create a Transaction
  const transaction = {
    date: moment().format('YYYY-MM-DD HH:mm:ss'),
    description: req.body.description,
    transaction_type: req.body.transaction_type,
    amount: amount,
    balance: balance
  };
  
  // Save Transaction in the database
  Transaction.create(transaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction."
      });
    });
};
// Export it to make it available outside
module.exports.create = create;

/**
 * 
 * @param: Object req 
 * @param: Object res 
 */
exports.findAll = (req, res) => {
  const title = req.query.title;
  console.log(title);
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  console.log(condition);
  Transaction.findAll({ 
    where: condition,
    order: [
      ['date', 'DESC']
    ]
   })
    .then(data => {
      console.log(data);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

/**
 * 
 * @param: null
 * @returns: Returns the current available balance left
 */
 async function calculateBalance() {
  const response =  await Transaction.findOne({
      attributes:[ 'balance' ],
      order: [
        ['id', 'DESC']
      ],
      limit: 1
    });
    console.log(response);
    return (response && response.balance) || 0
}