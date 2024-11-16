const express = require("express");
const { handleUserSignup, 
        handleGetAllUsers, 
        handleGetUserById, 
        handleDeleteUserById, 
        handleUpdateUserById, 
        handleUserLogin} = require("../controllers/user");

const router = express.Router();

//Combined route - /api/users
router.route('/')
      .get(handleGetAllUsers)
      .post(handleUserSignup);

//Combined route - /api/users/:id
router
  .route("/:id")
  .get(handleGetUserById)
  .put((req, res) => {
    return res.json({ status: "Task is pending" });
  })
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

router.get("/api/login", handleUserLogin);

module.exports = router;