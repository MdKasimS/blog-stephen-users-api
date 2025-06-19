const mongoose= require('mongoose');

const profileSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true 
    },
    last_name:{
        type: String,
        required: true 
    },
    gender:{
        type: String,
        required: true 
    },
    }, { timestamps: true});  


const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;  
