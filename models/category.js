var mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({
    url: String,
    name: String,
    description: String,
    image: String,
    body: String,
});

var CategorySchema = new mongoose.Schema({
    url: String,
    name: String,
    pages: [PageSchema]
});

module.exports = mongoose.model("Category", CategorySchema);