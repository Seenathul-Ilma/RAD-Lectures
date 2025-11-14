import { Request, Response } from "express";
import { User } from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
    // handle business logics here
    // const userData = req.body

    try {
        //const {name, email, age} = req.body
        const userName = req.body.name
        const userEmail = req.body.email
        const userAge = req.body.age

        if(!userName || !userEmail){
            return res.status(400).json({
                message: "Name and Email are cannot be empty..!"
            })
        }

        // we need to wait here until confirm the user is already exist or not (by searching the email)
        // so, must use 'await' - andalso, if we want to use an 'await' in a function, then that function must be 'asyncronous' - so use 'async' to function
        // await use krnne synchronous behaviour eka confirm krnna
        // but await krna hema serema perfomance adu venwa. so oni thenwala vitharak await use krnna.
        const existingUser = await User.findOne({ email: userEmail })

        if(existingUser) {
            return res.status(400).json({
                message: "Email already exists..!"
            })
        }

        const newUser = new User ({
            // left side from userModel : right side for value   (if both names are different)
            name: userName,
            email: userEmail,
            age: userAge
            //name,
            //email,
            //age
        })

        const savedUser = await newUser.save()   // await use krnne synchronous behaviour eka confirm krnna.. but await use krnna oninam, function eka async venna one

        console.log("Userdata: ", savedUser)

        res.status(201).json({
            message: "User Data Saved..!",
            data: savedUser
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: "Internal server errror while creating new user..!"
        })
    }
}

export const getAllUsers = (req: Request, res: Response) => {
    res.send("User list..!")
}

export const updateUser = (req: Request, res: Response) => {
    const updatedUserData = req.body

    console.log("Updated Userdata: ", updatedUserData)

    res.status(200).json({
        message: "User Data Updated..!",
        data: updatedUserData
    })
}