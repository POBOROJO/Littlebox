import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    tweet:{
        type:String,
        ref:"Post",
        require:true
    },
    body:{
        type:String,
        require:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    cratedAt:{
        type:Date,
        default:Date.now
    }
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment