var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: String,
    category: String,
    photos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Album", AlbumSchema);