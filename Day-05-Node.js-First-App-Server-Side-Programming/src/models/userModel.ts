// Like entities/tables

import mongoose, { Document, Schema } from "mongoose"

// Define typescript interface for User
// IUser  -> I - Interface, User Model
interface IUser extends Document{
    name: string
    email: string
    age?: number
}

// mehe type define karaddi 'String' 1st letter capital - bcz, this isn't typescript. MonogDB eke type ekak.. so methana MongoDB types thmai mention kranna venne
const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        age: { type: Number, required: false }
    },
    { timestamps: true }
)

export const User = mongoose.model<IUser>("User", userSchema)