var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    price: Number,
    products:[
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            count: Number
        }
    ],
    date: String,
    address: {
        country: String,
        city: String,
        street: String,
        zip: Number
    },
    description: String,
    status: String,
    delivery_date: Date
});

module.exports = mongoose.model("Product", ProductSchema);