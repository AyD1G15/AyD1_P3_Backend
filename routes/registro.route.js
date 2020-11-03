var multer = require('multer');
const { check, validationResult }  = require('express-validator'); 
const RegistroController = require('../controllers/registro.controller');
const {sendSingleUploadToGCS} = require('../middlewares/gcloud-storage.middleware');
var upload = multer({
    storage: multer.MemoryStorage
});
module.exports = (app) => {

    app.post('/registro', 
    [check('username', 'El nombre de usuario es obligatorio').exists().isLength({ min: 1 }),
    check('nombre', 'El nombre es obligatorio').exists().isLength({ min: 1 }),
    check('apellido', 'El apellido es obligatorio').exists().isLength({ min: 1 }),
    check('password', 'La contraseña es obligatoria').exists().isLength({ min: 1 }),
    check('dpi', 'El DPI es obligatoria').exists().isLength({ min: 1 }),
    check('edad', 'La edad es obligatoria').exists().isLength({ min: 1 }),
    check('fechaNacimiento', 'La fecha de nacimiento es obligatoria').exists().isLength({ min: 1 }),
    check('correo', 'El correo electronico es obligatorio').exists().isLength({ min: 1 }),
    check('correo', 'El formato de correo electronico no es valido').isEmail()
    ], 
    RegistroController.crearUsuario);
    app.get('/registro',RegistroController.obtenerUsuarios);

    app.post('/login',[check('correo', 'El correo o nombre de usuario es obligatorio').exists().isLength({ min: 1 }),
    check('password', 'La contraseña es obligatoria').exists().isLength({ min: 1 })    
    ],RegistroController.LoginUsuario);   
}