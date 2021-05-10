module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transactions", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATE
        },
        description: {
            type: Sequelize.STRING
        },
        transaction_type: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.FLOAT
        },
        balance: {
            type: Sequelize.FLOAT
        }
    }, {
        timestamps: false
    });
    return Transaction;
};