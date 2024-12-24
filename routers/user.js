const express = require("express");
const { handleUserSignup, 
        handleGetAllUsers, 
        handleGetUserById, 
        handleDeleteUserById, 
        handleUpdateUserById} = require("../controllers/user");

/*------------------------------------------------------------------------------------------
The req (request) and res (response) objects in Express.js are part of the middleware stack's functionality.
When you create a router using express.Router() and define routes on it, Express.js automatically passes 
the req and res objects to each route handler and middleware function.
------------------------------------------------------------------------------------------*/
const router = express.Router();

//Combined route - /api/users
router.route("/")
      .get(handleGetAllUsers)
      .post(handleUserSignup);

//Combined route - /api/users/:id
/*------------------------------------------------------------------------------------------
In Express.js, the .route("/:id") method is part of the routing system. It creates a route path that includes a parameter, 
in this case, :id. The colon (:) signifies that id is a placeholder for a dynamic value that can be accessed in the route handler.
The /:id part of the path indicates that the route includes a parameter named id. When a request is made to a path that matches /anything,
the value of anything will be captured as the id parameter.
------------------------------------------------------------------------------------------*/
router
  .route("/:id")
  .get(handleGetUserById)
  .put((req, res) => {
    return res.json({ status: "Task is pending" });
  })
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;