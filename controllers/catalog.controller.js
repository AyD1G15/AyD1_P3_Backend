const { getCargs, getValues } = require('../services/gift.service');

function arrayValuesToDictionary(arr) {
    var result = {};
    for (var i = 0; i < arr.length; i++) {
        result[arr[i].id] = arr[i].total;
    }
    return result;
}

module.exports = {
    getItems: (req, res) => {
        getCargs()
            .then(cards => {
                if (cards) {
                    getValues()
                        .then(values => {
                            const valuesAux = arrayValuesToDictionary(values);
                            var items = cards.filter(card => card.active)
                            var items = items.map(item => {
                                var availability = item.availability.map(id => {
                                    return {
                                        id: id,
                                        total: valuesAux[id]
                                    }
                                })
                                return {
                                    ...item,
                                    availability
                                }
                            })
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