const express = require('express');
const {handleUserLogin} = require('../controllers/user');

const router = express.Router();

router.post("/api/login", (req, res)=>{
    return res.send({"msg":"Checking"});
});


module.exports = router;