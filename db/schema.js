const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    wxOpenId: {
        type: String,
        require: true
    },
    balance: {
        type: Number,
        default: 5
    },
    model: {
        type: String,
        default: 'chatgpt'
    }
});

let userModel = mongoose.model("user", userSchema);

module.exports = {
    userModel
}
