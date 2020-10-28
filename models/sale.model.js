const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const SaleSchema = mongoose.Schema({
    // number: Number,
    status: Boolean,
    userId: ObjectId,
    creditCard: ObjectId,
    exchangeRate: Number,
    items: [
        {
            plataform: String,
            availability: String,
            quantity: Number
        }
    ],
    total: Number,
    date: Date
});

module.exports = mongoose.model("Sale", SaleSchema);