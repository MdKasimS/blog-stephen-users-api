const mongoose= require('mongoose');

const activeUserSchema = new mongoose.Schema({
    userId :{
        type : String,
        unique: true
    },
}, { timestamps: true});  

const ActiveUser = mongoose.model("activeUser", activeUserSchema);

module.exports = ActiveUser;  
