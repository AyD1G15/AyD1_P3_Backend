const User = require('../models/usuario.model');

module.exports = {
    buy: (req, res) => {
        const { userId, creditCard, items } = req.body;
        if(!userId){
            return res.status(400).send({
                error: true,
                messages: [
                    "No se recibio id de usuario"
                ]
            })
        }

        User.findById(userId).then(user => {
            console.log(user);

            if(user){
                return res.send({
                    error: false
                });                
            } else {
                return res.status(404).send({
                    error: true,
                    messages: [
                        "No existe usuario con id " + userId
                    ]
                })
            }
        }).catch(err => {
            console.log(err);
            return res.status(500).send({
                error: true,
                messages: [
                    "Ocurrio un error al buscar al usuario " + userId
                ]
            });
        });
    }
}