const router = require("express").Router();
const transactions = require("../controllers/transactions.controller.js");

// Create a new Transaction
router.post("/add", transactions.create);

// Retrieve all transactions
router.get("/list", transactions.findAll);

// Retrieve a single Tutorial with id
// router.get("/:id", transactions.findOne);

// // Update a transaction with id
// router.put("/:id", transactions.update);

// // Delete a transaction with id
// router.delete("/:id", transactions.delete);

module.exports = router;