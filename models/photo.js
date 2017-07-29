var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album"
    } 
});

module.exports = mongoose.model("Photo", PhotoSchema);