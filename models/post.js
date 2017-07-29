var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    date: { type: Date, default: Date.now }, 
    body: String,
    media: {
        type: String,
        url: String
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String 
    },
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

module.exports = mongoose.model("Post", PostSchema);