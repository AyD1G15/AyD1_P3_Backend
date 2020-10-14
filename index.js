const dotenv = require('dotenv');
dotenv.config();
var port = process.env.PORT || 3000;

const app = require('./app');
require('./config/mongoose');

var server = app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('	[GET] http://localhost:'+port);
});
