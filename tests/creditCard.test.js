const { maskNumber } = require('../utils/creditCard.util');


describe('Pruebas funciones de tarjeta de credio', () => {
    it('Prueba con un numero impleto', () => {
        const result = maskNumber('123412341234123');

        expect(result).toHaveProperty('error');
        expect(result.error).toBe(true);
        expect(result).toHaveProperty('message');
        expect(result.message).toEqual("Debe ingresar 12 numeros");
    });

    it('Prueba con un numero de tarjeta valido', () => {
        const result = maskNumber('1234123412341234');
        
        expect(result).toHaveProperty('error');
        expect(result.error).toBe(false);
        expect(result).toHaveProperty('maskedNumber');
        expect(result.maskedNumber.substring(4, 12)).toEqual('XXXXXXXX');
        
    })
})