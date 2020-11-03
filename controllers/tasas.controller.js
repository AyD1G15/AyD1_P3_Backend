const { getCargs, getValues, getTasas } = require('../services/gift.service');



module.exports = {
    getItems: (req, res) => {
        getTasas()
            .then(tasas => {
                if (tasas) {

                    res.send(tasas);

                } else {
                    res.send([])
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Ocurrio un error al obtener las tasas"
                })
            })
    }
}