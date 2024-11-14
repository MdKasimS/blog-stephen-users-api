const User = require("../models/user");

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
  console.log(`I was called`);

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email ||
    !body.job_type ||
    !body.password
  ) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  let result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    gender: body.gender,
    email: body.email,
    job_type: body.job_type,
    password: body.password,
  });

  console.log(result);
  return res.status(201).json({ msg: `success ${result.id}` });
}

async function handleUpdateUserById(req, res) {
  // old user data is returned. even timing setting isn;t giving corrct result
  // const user = await User.findByIdAndUpdate(req.params.id, {password:"#Sneha@Sunny"})

  const user = await User.findByIdAndUpdate(req.params.id, {
    password: "#MechanicalDilSe",
    job_type: "Mechanical Engineer",
  });
  // await setTimeout(()=>{}, 2000);
  console.log(user);
  return res.json({ msg: "User Profile Updated Successfully!" });
}

module.exports = {
  handleUserSignup,
  handleGetAllUsers,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
};
