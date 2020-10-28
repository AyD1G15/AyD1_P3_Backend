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
            currentId: Number,
            currentName: String
        }
    ],
    total: Number
});

module.exports = mongoose.model("Sale", SaleSchema);