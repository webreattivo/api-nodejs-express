var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact = Schema({
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    {
        collection: 'contact'
    });

mongoose.model('contact', Contact);