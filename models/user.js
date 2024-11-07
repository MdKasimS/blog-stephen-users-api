const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
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
    email :{
        type : String,
        required: true,
        unique: true
    },
    job_type:{
        type: String,
        required: true 
    }
    // password:{
    //     type: String,
    //     required: true
    // },
}, { timestamps: true});  

const User = mongoose.model("user", userSchema);

module.exports = User;  
