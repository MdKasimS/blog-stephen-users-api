const mongoose= require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    firstName:{
        type: String,
        required: false,
    },
    lastName:{
        type: String,
        required: false,
    },
    userName: {
        type: String,
        required: false,
        unique: true
    },
    gender:{
        type: String,
        required: false, 
    },
    }, { timestamps: true});  


const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;  
// This code defines a Mongoose schema and model for a user profile in a MongoDB database.
// The `profileSchema` includes fields for the user's first name, last name, username,


