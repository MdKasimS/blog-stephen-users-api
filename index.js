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



// app.use("/user", userRoute);

app.listen(PORT, ()=>{
    console.log("Listening on Port 8004....");
});


function connectToMongoDB(mongoDBUrl)
{
    const mongoose = require('mongoose');
    return mongoose.connect(mongoDBUrl);
}