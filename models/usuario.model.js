const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dpi: String,
    edad: Number,
    fechaNacimiento: Date,
    admin: Boolean
});

module.exports = mongoose.model("Usuario", UsuarioSchema);