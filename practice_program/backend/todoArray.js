const express = require('express');
const app = express();

app.use(express.json());

let todos = [];

// get all todos
app.get('/todos', function (req, res) {
    res.json(todos);
});

//get specific todo
app.get('/todos/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const todoID = todos.find(t => t.id === id)

    if (!todoID) return res.status(404).json({ message: "todo not found" })

    res.json(todoID)

});

// add new todo
app.post('/todos', function (req, res) {
    const newTodo = {
        id: parseInt(req.body.id),
        title: req.body.title
    }
    todos.push(newTodo);

    res.status(201).json(newTodo);
});

// update existing todo
app.patch('/todos/:id', function (req, res) {
    const id = parseInt(req.params.id);

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "todo not found" });
    }

    if (req.body.title !== undefined) {
        todo.title = req.body.title;
    }

    if (req.body.done !== undefined) {
        todo.done = req.body.done;
    }

    res.json(todo);
});

//delete the todo
app.delete('/todos/:id', function (req, res) {
    const id = parseInt(req.params.id);

    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({ message: "todo not found" });
    }

    todos = todos.filter(t => t.id !== id);

    res.json({ message: "todo deleted", deletedTodo: todo, todos });


});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});