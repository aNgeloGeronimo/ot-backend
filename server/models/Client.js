const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    money:{
        type: Number,
    }
});

module.exports = mongoose.model('Client', ClientSchema);