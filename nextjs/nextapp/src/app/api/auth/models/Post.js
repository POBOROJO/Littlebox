import mongoose from "mongoose";

const PostSchema  = new mongoose.Schema({
    title:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Post = mongoose.model("Post", PostSchema);
export default Post