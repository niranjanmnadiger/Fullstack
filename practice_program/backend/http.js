// backend of a TODO app

const express = require('express')
const app = express();

//route handlers
app.get('/', function (req, res) { // req - request , res - response, which is used to response
    res.send("hello world from get method");
})

app.post('/', function (req, res) {
    res.send("hello world from post method");
})
app.listen(3000);