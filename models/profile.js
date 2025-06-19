const mongoose= require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    first_name:{
        type: String,
        required: true 
    },
    last_name:{
        type: String,
        required: true 
    },
    username: String,
    gender:{
        type: String,
        required: true 
    },
    }, { timestamps: true});  


const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;  
// This code defines a Mongoose schema and model for a user profile in a MongoDB database.
// The `profileSchema` includes fields for the user's first name, last name, username,


