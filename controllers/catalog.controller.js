const { getCargs, getValues } = require('../services/gift.service');
const { populateValues } = require('../utils/card.util');

module.exports = {
    getItems: (req, res) => {
        getCargs()
            .then(cards => {
                if (cards) {
                    getValues()
                        .then(values => { 
                            var items = cards.filter(card => card.active)
                            items = populateValues(items, values);
                            res.send(items);
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: "Ocurrio un error al obtener los values"
                            })
                        })

                } else {
                    res.send([])
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Ocurrio un error al obtener las cards"
                })
            })
    }
}