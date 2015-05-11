var debug = require('debug')('rubrica:server');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/rubrica', function(err) {
    debug('server mongo started!');
    if (err) throw err;
});