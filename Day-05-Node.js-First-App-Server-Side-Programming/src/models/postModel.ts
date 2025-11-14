import mongoose, { Document, Mongoose, Schema } from "mongoose";

export interface IPost extends Document {
    title: string
    content: String
    userId: mongoose.Types.ObjectId
}

const postSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        userId: {type: Schema.Types.ObjectId, ref: "User", required: true}   // foriegn key ekak daganna ekata equal (post kiyl venama collection ekak array ekak vage User collection ekema store krgnna)
    }, 
    { timestamps: true }
)

export const Post = mongoose.model<IPost>("Post", postSchema)