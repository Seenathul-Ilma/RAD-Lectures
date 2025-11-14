// like controller in spring - specific routes for each

import { Router, Request, Response } from "express"; 
import { getAllItems, createItem } from "../controller/itemController";

const router = Router()

router.get("/", getAllItems)
router.post("/", createItem)

/* router.get("/", (req: Request, res: Response) => {
    res.send("Hello World..!")
})

router.post("/", (req: Request, res: Response) => {
    const itemData = req.body
    console.log("Itemdata: ", itemData)
    //itemData.name

    res.status(201).json({
        message: "Item Data Saved..!",
        data: itemData
    })
    //}).send()   // bcz, .json kiyl dagattoth send kiyl danna one na.. by default ethule thiynva..
}) */

export default router