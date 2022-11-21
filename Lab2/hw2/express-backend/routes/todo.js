const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const User = require("../models/User");

const privateKey = ``;

const router = express.Router();

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      /// log the error
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {

  var usernameQuery = await User.find()
    .where("_id")
    .equals(req.payload.id)
    .exec();

  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    dateCreated: req.body.dateCreated,
    complete: req.body.complete,
    dateCompleted: req.body.dateCompleted,
    username: usernameQuery[0].username,
  });
  return todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        _id: savedTodo._id,
        title: savedTodo.title,
        description: savedTodo.description,
        author: savedTodo.author,
        dateCreated: savedTodo.dateCreated,
        complete: savedTodo.complete,
        dateCompleted: savedTodo.dateCompleted,
        username: savedTodo.username,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (deletedTodo) {
    return res.status(200).send("Todo deleted");
  } else {
    return res.status(404).send(error.message);
  }
});

router.get("/", async function (req, res, next) {
  const todos = await Todo.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ todos: todos });
});

router.patch("/:id", async function (req, res) {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (todo) {
    todo.complete = req.body.complete;
    todo.dateCompleted = req.body.dateCompleted;
    const updatedTodo = await todo.save();
    return res.status(200).json(updatedTodo);
  } else {
    return res.status(404).send("Todo not found");
  }
});

module.exports = router;
