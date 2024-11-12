const fs = require('fs');

const express = require('express')
const app = express()

delete require.cache[require.resolve('./models/user')];
const users = require('./MOCK_DATA.json');
const User = require('./models/user');

const PORT = 8001

app.set("view engine","ejs");

connectToMongoDB("mongodb://localhost:27017/blog-stephen-grider")
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log("Oops! Connection Failed...", err));

//Middlewares In Express
app.use(express.urlencoded({extended:false}));

app.use((req, res, next)=>{
    console.log("Hi! this is middleware 1");
    next();
    // res.send("This is Middelware 1 terminating request.")
});

app.use((req, res, next)=>{
    fs.appendFile('log.txt', `${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n`, (err, data)=>{
        next();
    });
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const userRoute = require('./routers/routes');
// const staticRoute = requier('')


// ---- Routers Start From Here -----

//Hybrid Server for getting all users
app.get('/api/users', (req, res)=>{

    res.setHeader("X-MyName","Kasim Sache")
    res.json(users);
});

app.get('/users/', async (req, res)=>{

    const allUsers = await User.find({});
    const html = `<ul>
    ${allUsers.map((user)=>`<li>${user.first_name} - ${user.email}</li>`)
    .join("")}
    </ul>`;
    
    res.send(html);
});

//Handling user of sepecified id
//------------------------------------------------------

//Combined all types of requests for similar routes
app.route("/api/users/:id")
    .get((req, res)=>{
        const id = Number(req.params.id);
        const user = users.find((user)=>user.id===id);
        return res.json(user);
    })
    .put((req, res)=>{
        return res.json({status:"Task is pending"});
    })
    .patch((req, res)=>{
        return res.json({status:"Task is pending"});
    })
    .delete((req, res)=>{
        return res.json({status:"Task is pending"});
    });

    //Route for creating user in storage
app.post('/api/users/',async (req, res)=>{
    
    const body = req.body
    console.log(`I was called`)
    
    if(!body|| !body.first_name|| !body.last_name|| !body.gender|| !body.email|| !body.job_type) //!body.password
    {
        return res.status(400).json({msg:"All fields are required..."});
    }
    
    let result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        gender: body.gender,
        email: body.email,
        job_type: body.job_type,
        password: body.password
    });

    console.log(User.collection)

    console.log(result);  
    return res.status(201).json({msg:"success"});
    
    // Now shifting fromhard coding to database usage
    // users.push({...body, id: users.length +1});
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
    //     return res.json({status: "success", id: `${users.length}`});
    // });

    // console.log(users);
});

// app.patch('/api/users/:id',(req, res)=>{

//     return res.json({status:"Task is pending"});
// });

// app.put('/api/users/:id',(req, res)=>{

//     return res.json({status:"Task is pending"});
// });

// app.delete('/api/users/:id',(req, res)=>{

//     return res.json({status:"Task is pending"});
// });




// app.use("/user", userRoute);

app.listen(PORT, ()=>{
    console.log("Listening on Port 8004....");
});


function connectToMongoDB(mongoDBUrl)
{
    const mongoose = require('mongoose');
    return mongoose.connect(mongoDBUrl);
}