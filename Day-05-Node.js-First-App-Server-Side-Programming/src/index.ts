// Before Node 16
// commonJS - require() / module.export     (But, Cannot import type definitions)
// const express = require("express")


// After Node 16
// ESNext - import / export syntax
import express, { Application, Request, Response } from "express"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes"
import itemRoutes from "./routes/itemRoutes"

// : Application for typescript
const app: Application = express()

// JSON data parse - json data allaganna
app.use(express.json())

// routes - define endpoints (like controller in Spring)
// controller - handle requests and responses (like service in Spring)

// moved to userRoutes
//http://localhost:5000/
/* app.get("/", (req: Request, res: Response) => {
    res.send("Hello Zeenathul Ilma..!")
})

//http://localhost:5000/api/v1/user
app.post("/api/v1/user", (req: Request, res: Response) => {
    const userData = req.body
    console.log("userdata: ", userData)
    //userData.name

    res.status(201).json({
        message: "User Data Recieved..!",
        data: userData
    })
    //}).send()  // bcz, we used '.json', so don't want to add send() explicitly. It has send() by default inside '.json'
}) */

// Mount Routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/item", itemRoutes)

// connect to the database
// mongodb promise based database
const mongo = mongoose.connect("mongodb://localhost:27017/mongo_test_1")
mongo.then(()=>{
    console.log("MongoDB connected")
})
.catch((err)=>{
    console.error("Error Connecting MongoDB: ", err)
})

// best practice - keep at lower
app.listen(5000, () => {
    console.log("Sever running on port: 5000")
})