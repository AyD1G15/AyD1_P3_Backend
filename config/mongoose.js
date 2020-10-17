const mongoose = require('mongoose');

const host = 'cluster0.1ojwk.mongodb.net';
const username = 'practica3';
const password = 'Nq5La6e3KZhZ8jTO';
const database = 'practica3'
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`);
    
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
    console.log('connected'); // si esta todo ok, imprime esto
});

module.exports = mongoose;
