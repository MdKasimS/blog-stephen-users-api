const express = require('express');
const {handleUserLogin} = require('../controllers/user');

const router = express.Router();

router.get("/api/login", handleUserLogin);


module.exports = router;