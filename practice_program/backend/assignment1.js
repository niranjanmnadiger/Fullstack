const express = require("express");

const app = express();

let requestCount = 0;


//logs the method , timestamp and url on which the req is coming

app.use(function (req, res, next) {
    requestCount = requestCount + 1;

    const meth = req.method;

    console.log(meth);
    console.log(req.hostname)
    console.log(req.url);
    console.log(new Date())

})

app.get("/sum", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.get("/multiply", function (req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});

app.get("/divide", function (req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});

app.listen(3000);