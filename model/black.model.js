const mongoose = require('mongoose');

const blackSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
    
});

const blackModel = mongoose.model('Black', blackSchema);

module.exports = {blackModel};