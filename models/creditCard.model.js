const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const CreditCardSchema = mongoose.Schema({
    userId: ObjectId,
    number: String,
    maskedNumber: String,
    name: String,
    expirationDate: String,
    code: String
});

module.exports = mongoose.model("CreditCard", CreditCardSchema);

