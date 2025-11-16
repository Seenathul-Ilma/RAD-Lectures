import express from "express";
import cors from "cors"
import { sampleReusableMiddleware } from "./middlewares/sampleReusableMiddleware"

const app = express()

// get the data from the body using json type
// built-in middleware ekak (Global)
app.use(express.json())

// cors middleware
app.use(cors({
    origin: ["http://localhost:5173/"],  // frontend. not backend ("http://localhost:5000/")
    methods: ["POST", "GET", "PUT", "DELETE"]  // Allowed methods (optional) - "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
    //credentials: true
}))

// next - kemethi namak daganna puluvan (Not predefind)
// me global middleware eka hinda methanin ehata get api ekata yanne na. 
app.use((req, res, next) => {
    res.send("Hello.. This is a Global Middleware.")   // comment and call next() function to go forward
    //next()  // go forward 
})

app.get("/", (req, res) => {
    console.log("Default 'GET' endpoint is running.")  // meke console eke print vune na, it's because global middle ware
    res.send("Hello.. This is the 'GET' method inside node express beckend.")
})

// SAMPLE FOR REUSABLE MIDDLEWARE (Moved to its own file)
// In sampleReusableMiddleware.ts
/* const sampleReusableMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // logic
    next()
} */

// sampleReusableMiddleware() - a function call
// sampleReusableMiddleware - identify the function

//endpoint with multiple middlewares
app.get("/hello",
    (req, res, next) => {
        next()
        //console.log("Running the /hello endpoint");
    },
    (req,res,next)=>{
        //console.log("2nd middleware of /hello endpoint");
        next();
    },
    //sampleReusableMiddleware,   
    (req, res) => {
    console.log("'GET' endpoint 'hello' is running.")  // meke console eke print vune na, it's because global middle ware
    res.send("Hello.. This is the 'GET' method inside node express beckend, from '/hello'")
})

app.get("/test",
    /* (req, res, next) => {
        // logic
        next()
    }, */
    sampleReusableMiddleware,   // not function call. just identify the function  
    (req, res) => {
    console.log("'GET' endpoint 'test' is running.")  // meke console eke print vune na, it's because global middle ware
    res.send("Hello.. This is the 'GET' method inside node express beckend, from '/test'")
})

app.listen(5000, () => {
    console.log("Server is running..!")
})

// routes - define endpoints
// controller - handle requests and responses