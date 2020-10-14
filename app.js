var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
// app.use(upload.array()); 
app.use(express.static('public'));

require('./routes/index')(app);

module.exports = app;
