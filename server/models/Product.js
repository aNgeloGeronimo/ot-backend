const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    apparel:{
        type: String,
    },
    target:{
        type: String,
    },
    url:{
        type: String,
    },
    price:{
        type: Number,
    },
    description:{
        type: String,
    },
});

module.exports = mongoose.model('Product', ProductSchema);