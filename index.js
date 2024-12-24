
const {connectMongoDb} = require('./connection') 
const {logReqRes} = require('./middlewares')
const userRouter = require('./routers/user');
const staticRouter = require('./routers/staticRouter')

const express = require('express')
const app = express()

const PORT = 8004

app.set("view engine","ejs");

connectMongoDb("mongodb://localhost:27017/blog-stephen-grider")
        .then(()=> console.log("MongoDB Connected"))
        .catch((err)=> console.log("Oops! Connection Failed...", err));

//Middlewares
app.use((req, res, next)=>{
    console.log("Hi! this is middleware 1");
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logReqRes('log.txt'))

app.use("/api/users", userRouter);
app.use("/api/login", staticRouter);

app.listen(PORT, ()=>{
    console.log("Listening on Port 8004....");
});


