const express = require('express');
const {handleUserLogin} = require('../controllers/user');

/*------------------------------------------------------------------------------------------
The req (request) and res (response) objects in Express.js are part of the middleware stack's functionality.
When you create a router using express.Router() and define routes on it, Express.js automatically passes 
the req and res objects to each route handler and middleware function.
------------------------------------------------------------------------------------------*/
const router = express.Router();

router.route("/")
      .get(handleUserLogin);

module.exports = router;