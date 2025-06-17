const User = require("../models/user");
const Credential = require("../models/credential");
const {logInErrors} = require("../middlewares/logger")

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
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email ||
    !body.job_type ||
    !body.password ||
    !body.contact_number
  ) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  try{

    let userExist = await User.findOne({ $or: [{ email: body.email }, { contact_number: body.contact_numbert }] });
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
    first_name: body.first_name,
    last_name: body.last_name,
    gender: body.gender,
    email: body.email,
    job_type: body.job_type,
    password: body.password,
    contact_number: body.contact_number,
  });

  result = await Credential.create({
    password: body.password,
    user_id : result.id
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
    const user = await User.findOne({email, password});
    if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "user not found" });
    }
    console.log("User found:", user);
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
