const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express()
const port = 5000

const posts = [{
    id: 1 ,
    title: "john",
    summary: 21,
},{
    id: 2,
    title: "lily",
    summary: 21,
},{
    id: 3 ,
    title: "jack",
    summary: 21,
},];

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        posts,
    });
  });

app.post("/", (req, res)=>{
    posts.push(req.body);
    res.json({
        posts,
    });
});

app.put("/:id", (req,res)=> {
    const id = req.params.id;
    const body = req.body;
    posts.forEach((user)=>{
        if(user.id == id){
            user.title =  body.title;
        }
    })
    res.json({
        posts,
    });
})

app.delete("/:id", (req,res)=>{
    const id = req.params.id;
    const index = Number(id)-1;
    posts.splice(index,1);

    res.json({
        posts,
    })
})

app.listen(port, () => {
    console.log("Example app listening on port 3000")
})