const mongoose= require('mongoose');

const credSchema = new mongoose.Schema({

    user_id :{
        type : String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },

}, { timestamps: true});  

const Credential = mongoose.model("credential", credSchema);

module.exports = Credential;  
