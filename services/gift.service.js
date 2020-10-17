const axios = require('axios');

module.exports = {
    getCargs: async () => {
        return axios.get('https://my-json-server.typicode.com/CoffeePaw/AyD1API/Card')
            .then(response => {
                if (response.data) return response.data;
                return null;
            })
            .catch(err => {
                console.log(err);
                return null
            });
    },
    getValues: async () => {
        return axios.get('https://my-json-server.typicode.com/CoffeePaw/AyD1API/Value')
            .then(response => {
                if (response.data) return response.data;
                return null;
            })
            .catch(err => {
                console.log(err);
                return null;
            });
    }
}