const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express()
const port = 3000
const mongoose = require('mongoose');
const Post = require('./models/Post');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Database connected");
})


app.use(bodyParser.json());
app.use(cors());


//*GET
app.get('/', async(req, res) => {
    const data = await Post.find({});
    res.json({
        posts: data,
        status: "success",
    });
});

//*POST 
app.post("/", async(req, res)=>{
    const {title, summary} = req.body;
    const post = new Post({
        title,
        summary
    });
    await post.save();
    const data = await Post.find({});
    res.json({
        //TODO
        posts : post,
        success:true,
    });
});

app.put("/:id", async(req,res)=> {
    const {id} = req.params;
    const {title,summary} = req.body;
    await Post.findByIdAndUpdate(id, {title, summary});
    const post = await Post.find({});
    // posts.forEach((post)=>{
    //     if(post.id == id){
    //         post.title =  body.title;
    //         post.summary = body.summary;
    //     }
    // })
    res.json({
        posts: post,
        status: "Updated"
    });
})

app.delete("/:id", async(req,res)=>{
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    const post = await Post.find({});
    res.json({
        posts: post, 
        status: "Deleted"
    })
})

app.listen(port, () => {
    console.log("Server listening on port 3000")
})
