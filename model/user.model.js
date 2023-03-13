const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "seller"]
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = {userModel};