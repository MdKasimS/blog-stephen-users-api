const fs = require('fs');

const express = require('express')
const app = express()

const users = require('./MOCK_DATA.json');

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
    res.json(users);
});

app.get('/users', (req, res)=>{
    
    const html = `<ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
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
app.post('/api/users/',(req, res)=>{
    console.log("Createing new user");  

    const body = req.body
    users.push({...body, id: users.length +1});

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
        return res.json({status: "success", id: `${users.length}`});
    });

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




app.use("/user", userRoute);

app.listen(PORT, ()=>{
    console.log("Listening on Port 8004....");
});


function connectToMongoDB(mongoDBUrl)
{
    const mongoose = require('mongoose');
    return mongoose.connect(mongoDBUrl);
}