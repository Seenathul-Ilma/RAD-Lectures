// like service in spring

import { Request, Response } from "express"


export const createItem = (req: Request, res: Response) => {
    // handle business logics here
    const itemData = req.body

    console.log("Itemdata: ", itemData)

    res.status(201).json({
        message: "Item Data Saved..!",
        data: itemData
    })
}

export const getAllItems = (req: Request, res: Response) => {
    res.send("Item list..!")
}

