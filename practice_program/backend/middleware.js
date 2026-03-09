const e = require("express");
const express = require("express");

const app = express();



function isOldEnoughMiddleware(req, res, next) {
    const age = req.query.age;
    if (age >= 14) {
        next();
    } else {
        res.status(401).json({ message: "you are below the age criteria!" })
    }
}

app.use(isOldEnoughMiddleware); // if any middleware is used in every other route - then do this
//use it on top of all the routes to apply it to every other routes

app.get("/ride1", function (req, res) {

    res.json({ message: "ride 1 is booked for you" })

})

app.get("/ride2", function (req, res) {

    res.json({ message: "ride 2 is booked for you" })

})


app.listen(3000, () => {
    console.log("app is live one local host 3000")
})