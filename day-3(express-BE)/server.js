const express = require('express');
const port = 3000;
const path = require('path');

const app = express();


app.get("/hello", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})