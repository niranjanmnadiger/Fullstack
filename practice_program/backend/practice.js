const express = require("express")
const app = express();

app.use(express.json());

let todos = [];

//post a todo
app.post('/', function (req, res) {

    const newTodo = { // newtodo is an object which has ID and title as feilds 
        id: parseInt(req.body.id),
        title: req.body.title
    }

    todos.push(newTodo);
    res.status(201).json({ Message: "new todo added", todo: newTodo })
})

app.get('/', function (req, res) {

    res.json(todos)
})

app.get('/:id', function (req, res) {

    const id = parseInt(req.params.id)
    const todo = todos.find(t => t.id === id);

    if (!todo) return res.status(400).json({ Message: "todo not found" });
    res.json(todo)
})

app.patch('/:id', function (req, res) {

    const id = parseInt(req.params.id)
    const todo = todos.find(t => t.id === id);

    if (!todo) return res.status(400).json({ Message: "todo not found" });
    if (req.body.title !== undefined) { todo.title = req.body.title; }
    res.json({ message: "todo updated!!" })

});

app.delete('/:id', function (req, res) {

    const id = parseInt(req.params.id)
    const todo = todos.find(t => t.id === id);

    if (!todo) return res.status(400).json({ Message: "todo not found" });
    todos = todos.filter(t => t.id !== id);

    res.json({ message: "todo deleted" })

});

app.listen(3000, () => {
    console.log("app is live on local host 3000")
})