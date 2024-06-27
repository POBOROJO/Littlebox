import Post from "../models/Post.js";

const getPosts = async(req, res) => {
    const posts = await Post.find({});
    res.json({
        success: true,
        posts: posts
    })
}

const createPost = async(req,res)=>{
    const {title, createdAt} = req.body;
    const post = new Post({
        title,
        createdAt
    })
    await post.save();
    const posts = await Post.find({})
    res.json({
        success: true,
        posts: posts
    })
}

const updatePost = async(req, res) => {
    const id = req.params.id;
    const {title, createdAt} = req.body;
    await Post.findByIdAndUpdate(id,{title, createdAt});

    const posts = await Post.find({});
    res.json({
        success: true,
        posts: posts
    })
}

const deletePost = async(req, res) => {
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    const posts = await Post.find({});

    res.json({
        success: true,
        posts: posts
    })

    console.log("Deleted Post: ", id);
}

export {getPosts, createPost, updatePost, deletePost};
