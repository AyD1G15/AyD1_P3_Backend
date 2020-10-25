const mongoose = require('mongoose');

const PagoSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    numeroTarjeta: {
        type: String,
        required: true
    },
    nombreTarjeta: {
        type: String,
        required: true
    },
    fechaExpira: {
        type: String,
        required: true
    },
    fechaPago: {
        type: Date,
        required: true
    },
    moneda: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Pago", PagoSchema);