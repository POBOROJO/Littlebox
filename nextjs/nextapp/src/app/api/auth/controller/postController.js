import Post from "../models/Post.js";
const getPost = async()=>{
    const posts = await Post.find({});
    Response.status(200).json({
        success: true,
        posts: posts
    })
}

const createPost = async(req)=>{
    const {title, summary} = req.body;
    const post = new Post({
        title,
        summary
    })
    await post.save();
    const posts = await Post.find({})

    Response.status(200).json({
        success: true,
        posts: posts
    })
}

const updatePost = async(req)=>{
    const id = req.params.id;
    const {title, summary} = req.body;
    await Post.findByIdAndUpdate(id,{title, summary});

    const posts = await Post.find({});
    Response.json({
        success:true,
        posts: posts
    })
}

const deletePost = async(req)=>{
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    const posts = await Post.find({});
    
    Response.json({
        success: true,
        posts: posts
    })

    console.log("Deleted Post", id);
}

export {getPost, createPost, updatePost, deletePost};