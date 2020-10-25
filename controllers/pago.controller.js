const PagoModel = require('../models/pago.model');
const { check, validationResult } = require('express-validator');


module.exports = {
    crearPago: (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) { // se verifica que no existan errores de validacion
            //res.json(errors) 
            return res.status(400).send(errors);
        }
        else {

            const { username } = req.body;
            const { monto } = req.body;
            const { numeroTarjeta } = req.body;
            const { nombreTarjeta } = req.body;
            const { fechaExpira } = req.body;
            const { moneda } = req.body;
            const { codigoVerificacion } = req.body;

            var fechaPago = new Date();

            PagoModel.create({ username, monto, numeroTarjeta, nombreTarjeta, fechaExpira, fechaPago, moneda })
                .then(pago => {

                    if (pago) {
                        return res.send({
                            mensaje: 'Pago registrado correctamente',
                            _id: pago._id
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).send({
                        mensaje: 'Ha ocurrido un error creando el Pago'
                    });
                });
        }

    },

    eliminarPago: async id => {
        return await PagoModel.findByIdAndDelete(id)
            .then(pago => {
                if (pago) {
                    return true;
                }
                return false;

            })
            .catch(err => {
                return false;
            })
    },

    obtenerPagos: (req, res) => {
        PagoModel.find().then(pagos => {

            return res.send(pagos);

        })
            .catch(err => {
                return res.status(500).send({
                    mensaje: 'Error al obtener pagos.'
                });
            });
    }


}
