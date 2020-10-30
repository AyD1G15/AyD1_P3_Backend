const User = require('../models/usuario.model');
const UserInventory = require('../models/userInventory.model');

module.exports = {
    getInventory: (req, res) => {
        const { id } = req.params;
        User.findById(id).then(user => {
            if (user) {
                UserInventory.find({
                    userId: id
                }).then(inventory => {
                    return res.send(inventory);
                }).catch(err => {
                    console.log(err);
                    return res.status(500).send({
                        error: true,
                        messages: [
                            "Ocurrio un error al buscar el inventario con id " + id
                        ]
                    })
                })
            } else {
                return res.status(404).send({
                    error: true,
                    messages: [
                        "No existe usuario con id " + id
                    ]
                })
            }
        }).catch(err => {
            console.log(err);
            return res.status(500).send({
                error: true,
                messages: [
                    "Ocurrio un error al buscar al usuario con id " + id
                ]
            })
        })

        return;
    }
}