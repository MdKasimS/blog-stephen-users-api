const express = require("express");
const { handleUserSignup, 
        handleGetAllUsers, 
        handleGetUserById, 
        handleDeleteUserById, 
        handleUpdateUserById } = require("../controllers/user");

const router = express.Router();

//Handling user of sepecified id

router.get("/", handleGetAllUsers);

//Combined route - /api/users/:id
router
  .route("/:id")
  .get(handleGetUserById)
  .put((req, res) => {
    return res.json({ status: "Task is pending" });
  })
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

router.post('/', handleUserSignup);

module.exports = router;