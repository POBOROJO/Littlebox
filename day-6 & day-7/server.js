const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express()
const port = 3000

const posts = [{
    id: 1 ,
    title: "Post 1",
    summary: "This is a new post",
},{
    id: 2,
    title: "Post 2",
    summary: "This is a new table",
},{
    id: 3 ,
    title: "Post 3",
    summary: "This is a new day",
},];

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        posts: posts,
        status: "success",
    });
  });

app.post("/", (req, res)=>{
    posts.push(req.body);
    res.json({
        posts: posts,
        status: "Added new post"
    });
});

app.put("/:id", (req,res)=> {
    const {id} = req.params;
    const body = req.body;
    posts.forEach((post)=>{
        if(post.id == id){
            post.title =  body.title;
            post.summary = body.summary;
        }
    })
    res.json({
        posts: posts,
        status: "Updated"
    });
})

app.delete("/:id", (req,res)=>{
    const id = req.params.id;
    const index = Number(id)-1;
    posts.splice(index,1);

    res.json({
        posts: posts, 
        status: "Deleted"
    })
})

app.listen(port, () => {
    console.log("Server listening on port 3000")
})