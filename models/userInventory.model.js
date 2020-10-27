const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const UserInventorySchema = mongoose.Schema({
    userId: ObjectId,
    giftcardId: String,
    plataformId: String,
    plataformName: String,
    availability: String,
    value: Number,
    image: String,
    saleId: ObjectId
});

module.exports = mongoose.model("UserInventory", UserInventorySchema);

