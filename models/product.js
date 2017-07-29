var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    price: Number,
    categories:[],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Product", ProductSchema);