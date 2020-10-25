var multer = require('multer');
const { check, validationResult }  = require('express-validator'); 
const PagoController = require('../controllers/pago.controller');
const {sendSingleUploadToGCS} = require('../middlewares/gcloud-storage.middleware');
var upload = multer({
    storage: multer.MemoryStorage
});
module.exports = (app) => {

    app.post('/pago', 
    [check('username', 'El nombre de usuario es obligatorio').exists().isLength({ min: 1 }),
    check('numeroTarjeta', 'El numero de tarjeta es obligatorio').exists().isLength({ min: 1 }),
    check('nombreTarjeta', 'El nombre de tarjeta es obligatorio').exists().isLength({ min: 1 }),
    check('monto', 'El monto es obligatorio').exists().isLength({ min: 1 }),
    check('codigoVerificacion', 'El codigo de verificacion es obligatorio').exists().isLength({ min: 1 }),
    check('fechaExpira', 'La fecha de expiracion es obligatoria').exists().isLength({ min: 1 }),
    check('moneda', 'La moneda es obligatoria').exists().isLength({ min: 1 })
    ], 
    PagoController.crearPago);
    app.get('/pago',PagoController.obtenerPagos);
 
}