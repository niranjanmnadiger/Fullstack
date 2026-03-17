const express = require("express");
const app = express();

// middleware - modifying the request or response object 

let requestCount = 0

function middleware(req, res, next) {
    requestCount = requestCount + 1;
    req.name = "niranjan"
    console.log(`total number of requests are ${requestCount}`)
    next();
}

function sum(req, res) {

    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    console.log(req.name);

    res.json({ answer: a + b })
}

app.get("/add", middleware, sum);



app.listen(3000, () => { console.log("working on local host 3000") })