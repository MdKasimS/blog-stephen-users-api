
const {connectMongoDb} = require('./connection') 
const {logReqRes} = require('./middlewares/index')
const userRouter = require('./routers/user');
const staticRouter = require('./routers/staticRouter')

const express = require('express')
const app = express()

const PORT = 8004

/*-----------------------------------------------------------------------------------
This sets the view engine for your application to EJS (Embedded JavaScript). 
This means that your application will use EJS to render templates when you call the res.render method in your routes.
EJS is a popular template engine that allows you to create HTML templates with embedded JavaScript.
By setting up EJS as your view engine, you can create dynamic web pages that can render different content based on the data passed to them.
The EJS template (index.ejs) uses the <%= %> syntax to embed JavaScript values into the HTML.
Fo eg:- res.render('index', { title: 'Home Page', message: 'Welcome to my website!' });
code line renders the index.ejs template and passes data (title and message) to the template.
-----------------------------------------------------------------------------------*/
app.set("view engine","ejs");

connectMongoDb("mongodb://localhost:27017/blog-stephen-grider")
        .then(()=> console.log("MongoDB Connected"))
        .catch((err)=> console.log("Oops! Connection Failed...", err));

//Middlewares
/*-----------------------------------------------------------------------------------
"app.use" => This is a method in Express.jsused to mount middleware functions. 
Middleware functions are functions that have access to the request object (req), 
the response object (res), and the next middleware function in the application’s request-response cycle. 
-----------------------------------------------------------------------------------*/
// app.use((req, res, next)=>{
//     console.log("Hi! this is middleware 1");
//     next();
// });  ------------------------>>>> You can check call of middleware for evry request by uncommenting this code line

/*-----------------------------------------------------------------------------------
This function will be executed for every incoming request.
This middleware is used to parse incoming requests with JSON payloads.
Adds a middleware function to the Express.jsapplication's request handling pipeline.
It is based on the body-parser module, which is now included in Express.js.
It parses the incoming request bodies that contain JSON payloads and makes them accessible under the req.body property. 
-----------------------------------------------------------------------------------*/
app.use(express.json());

/*------------------------------------------------------------------------------------------
This function will be executed for every incoming request.
This middleware is used to parse incoming requests with URL-encoded payloads.
Adds a middleware function to the Express.jsapplication's request handling pipeline.
It parses incoming request bodies that are URL-encoded, typically used for form submissions. 
It makes the parsed data available under the req.body property.
------------------------------------------------------------------------------------------*/
app.use(express.urlencoded({extended: false}));

/*------------------------------------------------------------------------------------------
This function will be executed for every incoming request.
It is responsible for logging requests and responses to a file named log.txt.
In Express.js, middleware functions have access to the req (request) and res (response) objects, 
and they must be registered using app.use or within a specific route.
------------------------------------------------------------------------------------------*/
app.use(logReqRes('log.txt'));


/*------------------------------------------------------------------------------------------
This method sets up middleware to handle routes that start with /api/users in your Express.jsapplication.
"/api/users": This is the base path for the routes. Any request that starts with /api/users will be handled by the middleware or router specified.
userRouter: This is an instance of an Express Router. The router is used to define multiple routes that share the base path /api/users.
------------------------------------------------------------------------------------------*/
app.use("/api/users", userRouter);

app.use("/api/login", staticRouter);

/*------------------------------------------------------------------------------------------
The app.listen(PORT, () => { console.log("Listening on Port 8004...."); }); method in Express.jsis responsible for starting the server
 and listening for incoming requests on the specified port.
Under the hood, app.listen creates an instance of the Node.jsHTTP server using the http.createServer method. 
Express.js is built on top of Node.js, so it leverages the built-in HTTP module to handle incoming requests.
The callback function provided as the second argument to app.listen is executed once the server starts successfully. 
In your example, the callback function logs a message to the console indicating that the server is listening on port 8004.
------------------------------------------------------------------------------------------*/
app.listen(PORT, ()=>{
    console.log("Listening on Port 8004....");
});


