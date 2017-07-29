var mongoose = require('mongoose');

var LikeSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String 
    }
});

module.exports = mongoose.model("Like", LikeSchema);