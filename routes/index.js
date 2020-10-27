module.exports = (app, server) => {
   require('./catalog.route')(app);
   require('./sale.route')(app);
}