const { getHexId } = require('../utils/card.util');

describe('Pruebas funciones de giftcards', () => {
    it('Generacion de id', () => {
        const id = getHexId();
        
        expect(id).not.toBe("");
    })
})