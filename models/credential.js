const mongoose= require('mongoose');

const credentialSchema = new mongoose.Schema({

   userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        unique: true 
    },

    password:{
        type: String,
        required: true
    },

}, { timestamps: true});  

const Credential = mongoose.model("credential", credentialSchema);

module.exports = Credential;  

// This code defines a Mongoose schema and model for user credentials in a MongoDB database.
// The `credSchema` includes fields for the user's ID (referencing the User model)
