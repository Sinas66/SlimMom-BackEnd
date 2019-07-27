const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('../middleware/timestamp');

const userNameToLower = user => {
    return user.userName.toLowerCase().trim
}

const userSchema = new Schema(
    {
        userName: { type: String, unique: true, required: true, userNameToLower },
        password: { type: String, required: true },
        userData: {
            type: Object,
            email: { type: String, unique: true },
            token: { type: Array }
        },
        eatsRecorded: { type: Array }
    },
    {
        timestamps: true
    }
);

userSchema.plugin(timestamp);

const User = mongoose.model('User', userSchema);

module.exports = User;
