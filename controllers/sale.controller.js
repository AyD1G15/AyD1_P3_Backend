const User = require('../models/usuario.model');
const CreditCard = require('../models/creditCard.model');
const Sale = require('../models/sale.model');
const UserInventory = require('../models/userInventory.model');

const { getCargs, getValues, getExchangeRate } = require('../services/gift.service');
const { populateValues, arrayToObject } = require('../utils/card.util');

module.exports = {
    buy: (req, res) => {
        const { userId, creditCard, items } = req.body;
        var error = false;
        var messages = [];
        var total = 0;
        if (!userId) {
            error = true;
            messages.push('El id de usuario es obligatorio')
        }

        if (!creditCard) {
            error = true;
            messages.push('Los datos de tarjeta de credito son obligatorios')
        } else {
            if (!creditCard.number) {
                error = true;
                messages.push(`Falta el numero de la tajera de credito`);
            }
            if (!creditCard.name) {
                error = true;
                messages.push(`Falta el nombre de la tajera de credito`);
            }
            if (!creditCard.expirationDate) {
                error = true;
                messages.push(`Falta la fecha de expiracion de la tajera de credito`);
            }
            if (!creditCard.code) {
                error = true;
                messages.push(`Falta el codigo de la tajera de credito`);
            }
        }

        if (!items) {
            error = true;
            messages.push('Debe enviar una lista de items para la compra')
        } else if (items.length === 0) {
            error = true;
            messages.push('Debe enviar una lista de items para la compra')
        }

        if (error) {
            return res.status(400).send({
                error,
                messages
            })
        }

        User.findById(userId).then(user => {
            if (user) {
                getExchangeRate().then(exchangeRate => {
                    getCargs().then(cards => {
                        getValues().then(values => {
                            var cardItems = cards.filter(card => card.active)
                            cardItems = populateValues(cardItems, values);
                            const catalog = arrayToObject(cardItems);
                            //Validacion de items a comprar
                            var inventoryItems = [];

                            for (var i = 0; i < items.length; i++) {
                                const item = items[i];
                                const plataform = catalog[item.plataform];

                                if (plataform) {
                                    const { id, name, image, chargeRate } = plataform;
                                    var availabilities = arrayToObject(plataform.availability);
                                    const availability = availabilities[item.availability];
                                    if (availability) {
                                        inventoryItems.push({
                                            userId: userId,
                                            // giftcardId: String,
                                            plataformId: id,
                                            plataformName: name,
                                            availability: availability.id,
                                            value: availability.total,
                                            image: image,
                                            // saleId: ObjectId
                                        });

                                        total = total + (parseFloat(availability.total) + parseFloat(chargeRate)) * parseFloat(item.quantity) * parseFloat(exchangeRate[0].total)
                                    } else {
                                        error = true;
                                        messages.push("Actualmente no esta disponible el valor con id = " + item.availability + " para la plataforma " + name);
                                    }
                                } else {
                                    error = true;
                                    messages.push("No esta dispible la plataforma con id " + item.plataform);
                                }
                            }
                            if (error) {
                                return res.status(404).send({
                                    error,
                                    messages
                                });
                            }
                            CreditCard.findOne({
                                number: creditCard.number
                            }).then(creditResult => {
                                if (creditResult) {
                                    //La tarjeta existe
                                    //realizar compra
                                    Sale.create({
                                        status: true,
                                        userId: userId,
                                        creditCard: creditResult._id,
                                        exchangeRate: exchangeRate.total,
                                        items: items,
                                        total: total
                                    }).then(sale => {
                                        inventoryItems = inventoryItems.map(inventoryItem => ({
                                            ...inventoryItem,
                                            saleId: sale._id
                                        }));

                                        UserInventory.insertMany(inventoryItems).then(inventoryItems => {
                                            
                                        }).catch(err => {
                                            console.log(err);
                                        });
                                        return res.send({
                                            _id: sale._id,
                                            message: "Se ha realizado la compra correctamente"
                                        })
                                    }).catch(err => {
                                        console.log(err);
                                    })
                                } else {
                                    //Crear tarjeta
                                    CreditCard.create({
                                        ...creditCard
                                    }).then(creditCard => {
                                        //realizar 
                                        //realizar compra
                                        Sale.create({
                                            status: true,
                                            userId: userId,
                                            creditCard: creditCard._id,
                                            exchangeRate: exchangeRate,
                                            items: items,
                                            total: total
                                        }).then(sale => {
                                            inventoryItems = inventoryItems.map(inventoryItem => ({
                                                ...inventoryItem,
                                                saleId: sale._id
                                            }));

                                            UserInventory.insertMany(inventoryItems).then(inventoryItems => {
                                                
                                            }).catch(err => {
                                                console.log(err);
                                            });

                                            return res.send({
                                                _id: sale._id,
                                                message: "Se ha realizado la compra correctamente"
                                            });
                                        }).catch(err => {
                                            console.log(err);
                                        })
                                    }).catch(err => {
                                        error = true;
                                        messages.push("Ocurrio un error al crear la tarjeta de credito")
                                    })
                                }
                            }).catch(err => {
                                console.log(err);
                                error = true;
                                messages.push("Ocurrio un error al buscar la tarjeta de credito")
                            });

                            if (error) {
                                return res.status(404).send({
                                    error,
                                    messages
                                });
                            }


                        }).catch(err => {
                            console.log(err);
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                })

            } else {
                error = true;
                messages.push("No existe usuario con id " + userId)
                return res.status(404).send({
                    error,
                    messages
                });
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