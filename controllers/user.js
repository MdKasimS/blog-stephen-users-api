const User = require("../models/user");
const Credential = require("../models/credential");
const Profile = require("../models/profile");
const {logInErrors} = require("../middlewares/errorLogger")

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  res.json(allUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }

  return res.json(user);
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: `Deleted User ${req.params.id}` });
}

async function handleUserSignup(req, res) {
  const body = req.body;
  console.log(`User Signup Handler Invoked...`);

  if (
    !body ||
    !body.email ||
    !body.password ||
    !body.contactNumber
  ) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  try{

    let userExist = await User.findOne({ $or: [{ email: body.email }, { contactNumber: body.contactNumbert }] });
    if (userExist!=null) 
      { 
        throw new Error('User already exists'); 
      }
    }
    catch (error) 
    { 
      console.error('Error checking user:', error.message); 
      logInErrors(error.message);
      return res.status(400).json({ msg: error.message}); // Error occurred
    }
  
   let result = await User.create({
    email: body.email,
    contactNumber: body.contactNumber,
  });

  result = await Credential.create({
    password: body.password,
    userId : result.id
  });
  
  console.log(result);
  return res.status(201).json({ msg: `success ${result.id}` });
}

async function handleUpdateUserById(req, res) {

  const user = await User.findByIdAndUpdate(req.params.id, {
    password: "#MechanicalDilSe",
    job_type: "Mechanical Engineer",
  });
  console.log(user);
  return res.json({ msg: "User Profile Updated Successfully!" });
}

async function handleUserLogin(req, res) {
    const {email,password} = req.body;
    console.log(`User Login Handler Invoked for ${email}...`);
    const user = await User.findOne({email, password});
    if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "user not found" });
    }
    // console.log("User found:", user);
    console.log(`User found: ${email}`);
    return res.json(user);
}

module.exports = {
  handleUserSignup,
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
  handleUserLogin,
};

// 🧠 High-Level Registration Flow
// - Validate user input.
// - Create the user document (email, contact).
// - Hash password → store in Credential with userId.
// - Create profile (username, gender, etc.) linked by userId.
// - Generate JWT and respond.
