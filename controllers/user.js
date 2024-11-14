const User = require('../models/user'); 


async function handleUserSignup(req, res){

    
        const body = req.body;
        console.log(`I was called`);
      
        if (
          !body ||
          !body.first_name ||
          !body.last_name ||
          !body.gender ||
          !body.email ||
          !body.job_type
        ) {
          //!body.password
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
      
        console.log(User.collection);
      
        console.log(result);
        return res.status(201).json({ msg: "success" });
      
   
    // return res.render('home')

}

module.exports = {
    handleUserSignup,
}