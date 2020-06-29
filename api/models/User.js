const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required:true,
    },
    avatar: {
        type: String,
        default: 'null'
    },
    joinedIn: { 
        type: Date, 
        default: Date.now
    }
    
    //ADD PROFILE, SETTINGS....
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = User;