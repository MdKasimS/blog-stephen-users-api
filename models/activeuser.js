const mongoose= require('mongoose');

const activeUserSchema = new mongoose.Schema({
    user_id :{
        type : String,
        unique: true
    },
}, { timestamps: true});  

const ActiveUser = mongoose.model("activeUser", activeUserSchema);

module.exports = ActiveUser;  
