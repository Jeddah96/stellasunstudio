var mongoose = require('mongoose');

var ArtSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: String,
    image: String,
    categories:[],
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

module.exports = mongoose.model("Art", ArtSchema);