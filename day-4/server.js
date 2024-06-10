const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const users = [
  {
    id: 1,
    name: "John",
    age: 21,
  },
  {
    id: 2,
    name: "Jane",
    age: 22,
  },
  {
    id: 3,
    name: "Jim",
    age: 23,
  },
  {
    id: 4,
    name: "Jill",
    age: 24,
  },
];


app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    users,
  });
});

app.post("/user", (req, res) => {
  users.push(req.body);
  res.json({
    msg: "User created",
  });
});

app.put("/:id", (req, res) => {
    const {id} = req.params;
    const body = req.body;

    users.forEach((user)=>{
        if(user.id == id){
            user.name = body.name;
            user.age = body.age;
            res.json({
                status: "User Updated",
                user : users.find(u => u.id == id),
            })
        }
    })

    res.json({
        msg: "User not found",
    })
})


app.delete("/:id", (req, res) => {
    const {id} = req.params;
    const index = Number(id) -1;

    if(index < 0 || index >= users.length){
        res.json({
            msg: "User not found",
        })
    }
    users.splice(index,1);

    res.json({
        message: "User deleted successfully",
        users:users,
    })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000 http://localhost:3000");
});
