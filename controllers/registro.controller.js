const UsuarioModel = require('../models/usuario.model');
const { check, validationResult } = require('express-validator');


module.exports = {
    crearUsuario: (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) { // se verifica que no existan errores de validacion
            //res.json(errors) 
            return res.status(400).send(errors);
        }
        else {

            const { username } = req.body;
            const { nombre } = req.body;
            const { apellido } = req.body;
            const { correo } = req.body;
            const { password } = req.body;
            const { edad } = req.body;
            const { dpi } = req.body;
            const { fechaNacimiento } = req.body;
            

            UsuarioModel.find({ correo: correo }, function (err, result) {
                console.log(err);
                if (err) throw err;
                if (result.length > 0) {
                    return res.status(400).send({
                        mensaje: 'El correo electronico ya fue registrado'
                    });
                } else {

                    UsuarioModel.create({ username, nombre, apellido, correo, password, dpi, edad, fechaNacimiento })
                        .then(usuario => {
                         
                            if (usuario) {
                                return res.send({
                                    mensaje: 'Usuario registrado correctamente',
                                    _id: usuario._id
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(500).send({
                                mensaje: 'Ha ocurrido un error creando el Usuario'
                            });
                        });
                }
            })


        }

    },

    obtenerUsuarios: (req, res) => {
        UsuarioModel.find().then(usuarios => {

            return res.send(usuarios);

        })
            .catch(err => {
                return res.status(500).send({
                    mensaje: 'Error al obtener usuarios.'
                });
            });
    },
    eliminarUsuario: async id => {
        return await UsuarioModel.findByIdAndDelete(id)
            .then(usuario => {
                if (usuario) {
                    return true;
                }
                return false;

            })
            .catch(err => {
                return false;
            })
    }
}
