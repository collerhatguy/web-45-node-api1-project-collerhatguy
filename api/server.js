// BUILD YOUR SERVER HERE
const express = require("express")
const server = express();
const {
    find,
    findById,
    insert,
    update,
    remove,
} = require("./users/model"); 

server.use(express.json())

server.post("/api/users", (req, res) => {
    const { body: newUser } = req;
    if (!newUser.name || !newUser.bio) return res.status(400).json({ message: "Please provide name and bio for the user" })
    insert(newUser).then(createdUser => {
        res.status(201).json(createdUser)
    })
    .catch(() => {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    })
})

server.get("/api/users", (req, res) => {
    find().then(users => {
        res.status(200).json(users)
    }).catch(() => {
        res.status(500).json({ message: "The users information could not be retrieved" })
    })
})

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    findById(id).then(user => {
        user ? 
            res.status(200).json(user)
            :
            res.status(404).json({ message: "The user with the specified ID does not exist" })
    }).catch(() => {
        res.status(500).json({ message: "The user information could not be retrieved" })
    })
})

server.put("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req;
    if (!body.bio || !body.name) return res.status(400).json({ message: "Please provide name and bio for the user" })
    
    update(id, body).then(updatedUser => {
        updatedUser ?
            res.status(200).json(updatedUser)
            :
            res.status(404).json({ message: "The user with the specified ID does not exist" })
    }).catch(() => {
        res.status(500).json({ message: "The user information could not be modified" })
    })
})

server.delete("/api/users/:id", (req, res) => {
    remove(req.params.id).then(deletedUser => {
        deletedUser ?
            res.status(201).json(deletedUser)
            : 
            res.status(404).json({ message: "The user with the specified ID does not exist" })
    }).catch(() => {
        res.status(500).json({ message: "The user could not be removed" })
    })
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
