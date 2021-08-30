const server = require('./api/server');
const { listen, get, post, put } = server;

const {
    find,
    findById,
    insert,
    update,
    remove,
  } = require("./api/users/model"); 

const port = 5000;

// START YOUR SERVER HERE

get("api/users", (req, res) => {
   res.status(200).json(find())
})

get("api/users/:id", (req, res) => {
    const user = findById(req.params.id)
    res.status(200).json(user)
})

post("api/users", (req, res) => {
    req.body
    const newUser = insert(req.body)
    res.status(200).json(newUser)
})

put("api/users/:id", (req, res) => {
    const updatedUser = update(req.params.id, res.body)
    res.status(200).json(updatedUser)
})

server.delete("api/users/:id", (req, res) => {
    remove(req.params.id)
    res.status(200).json("deleted")
})


listen(port, () => {
    console.log("server is running")
})