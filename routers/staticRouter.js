const express = require('express');
const {handleUserLogin} = require('../controllers/user');

const router = express.Router();

router.route("/")
      .get(handleUserLogin);

module.exports = router;