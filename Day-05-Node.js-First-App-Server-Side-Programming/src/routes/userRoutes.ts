// like controller in spring - specific routes for each feature

import { Router, Request, Response } from "express";
import { createUser, getAllUsers, updateUser } from "../controller/userController";

const router = Router()

router.get("/", getAllUsers)
router.post("/save", createUser)
router.put("/update", updateUser)

/* 
//http://localhost:5000/api/v1/user/ or http://localhost:5000/api/v1/user
router.get("/", (req: Request, res: Response) => {
    res.send("Hello Zeenathul Ilma..!")
})

//http://localhost:5000/api/v1/user/save
router.post("/save", (req: Request, res: Response) => {
    const userData = req.body
    console.log("userdata: ", userData)
    //userData.name

    res.status(201).json({
        message: "User Data Saved..!",
        data: userData
    })
    //}).send()
})
*/

export default router