const express = require("express");
const { handleUserSignup } = require("../controllers/user");

const router = express.Router();

//Hybrid Server for getting all users
router.get("/", async (req, res) => {
  // res.setHeader("X-MyName","Kasim Sache")
  const allUsers = await User.find({});
  res.json(allUsers);
});

// router.get("/users", async (req, res) => {
//   const allUsers = await User.find({});
//   const html = `<ul>
//     ${allUsers
//       .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
//       .join("")}
//     </ul>`;

//   res.send(html);
// });

//Handling user of sepecified id
//------------------------------------------------------

//Combined all types of requests for similar route - /api/users/:id
router
  .route("/:id")
  .get(async (req, res) => {
    // const id = Number(req.params.id);

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.json(user);
  })
  .put((req, res) => {
    return res.json({ status: "Task is pending" });
  })
  .patch(async (req, res) => {
    // old user data is returned. even timing setting isn;t giving corrct result
    // const user = await User.findByIdAndUpdate(req.params.id, {password:"#Sneha@Sunny"})

    const user = await User.findByIdAndUpdate(req.params.id, {
      password: "#Sneha@Sunny",
      job_type: "Software Engineer",
    });
    // await setTimeout(()=>{}, 2000);
    console.log(user);
    return res.json({ msg: "User Profile Updated Successfully!" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: `Deleted User ${req.params.id}` });
  });

//Route for creating user in storage
// router.post("/", async (req, res) => {
//   const body = req.body;
//   console.log(`I was called`);

//   if (
//     !body ||
//     !body.first_name ||
//     !body.last_name ||
//     !body.gender ||
//     !body.email ||
//     !body.job_type
//   ) {
//     //!body.password
//     return res.status(400).json({ msg: "All fields are required..." });
//   }

//   let result = await User.create({
//     first_name: body.first_name,
//     last_name: body.last_name,
//     gender: body.gender,
//     email: body.email,
//     job_type: body.job_type,
//     password: body.password,
//   });

//   console.log(User.collection);

//   console.log(result);
//   return res.status(201).json({ msg: "success" });

//   // Now shifting fromhard coding to database usage
//   // users.push({...body, id: users.length +1});
//   // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
//   //     return res.json({status: "success", id: `${users.length}`});
//   // });

//   // console.log(users);
// });

app.post('/', handleUserSignup)

// app.patch('/api/users/:id',(req, res)=>{

//     return res.json({status:"Task is pending"});
// });

// app.put('/api/users/:id',(req, res)=>{

//     return res.json({status:"Task is pending"});
// });

// app.delete('/api/users/:id',(req, res)=>{

//     return res.json({status:"Task is pending"});
// });


module.exports = router;