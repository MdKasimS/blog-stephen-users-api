const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    email :{
        type : String,
        required: true,
        unique: true
    },
   
    contactNumber:{
        type : String,
        required: false,
        unique: true
    },
    profileId: {
        type: mongoose.Schema.Types.Mixed, default: null,
    },
}, { timestamps: true});  

const User = mongoose.model("user", userSchema);

module.exports = User;  

// This code defines a Mongoose schema and model for a user in a MongoDB database.
// The `userSchema` includes fields for the user's email, contact number, and
