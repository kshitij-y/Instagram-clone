const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kshitij:esdXfLs$ywF42a.@cluster0.ampvoxv.mongodb.net/instagram-clone")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});
const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]

});


const User = mongoose.model('User', userSchema);
const Profile = mongoose.model('Profile', profileSchema)
module.exports = {
    User,
    Profile
};