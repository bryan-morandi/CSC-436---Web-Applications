const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const User = require("../models/User");

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHdapLnd1y0c3UhMD6smiSLQ0m5+Xn6u3/ms0sQZAHe4XSxutNPc
kCcC2CSIaYTLpbhtcnNMKkb6J9dyb09GIpa24OtOJ/vNA/2Zq1yTB+5Aj0CcAtkM
ze0fvYH+kpdieeK71oHg7FtG1QIuUsvU0u9LOeM6ZvZ7nO8YoLGR/9LFAgMBAAEC
gYBYAKuoqBt6FehK4FpFNbqzwwkFk4OVINfgPj+Be3XO0E9S7aXC+MQJH53DAhnb
YlSksX5L6QLbJqOtxaCw8OOa8pdEHLnDlT16Nx1ioU2xsG8fp5tlC3VaMtSvk8Xy
DJchl//VwMMLwOFOfyv6FnpIrT8IlFrUROpM/2f4sqC+2QJBAO6CHyX1aQFOS8+C
DzeAUIkabpKmqdCiEJ0eMj2wUMwvTbdq7lBuFSOfVuhv+fA0si9mHNYROhDZgL0L
w8RS9dMCQQCAG3V0EAe5LCU8b9aepq1Vdspvhx1IFtolfjVxMm6q1yyJ7XrJ7X49
12HX0Qiowv0abh8vqtjYqx1bJGc5xj4HAkB6wrbNjtcROP+EOukiJAVPzC8FhIr7
O69Zb2Vkow+zSNWzhnJLK53ty+GrmZcHr9fW1bQZ6pv8eDbvFtMYharJAkApYrWL
DTKxi6Vr5OV803PjzECRzyCSjW9j9WXmb9h4sJLe7C1i1qqV5+LgCdO2UWfbBgBl
MdhkBsOxEg2XCIg5AkEA6qP4VRSInEV2gK4NzRP3YidQcoWwfBfPlNHBh4kmiJhA
Zj0+ZFmipDNo64VTai98rnc/OuSC93cKVJeoXyW0bQ==
-----END RSA PRIVATE KEY-----`;

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
