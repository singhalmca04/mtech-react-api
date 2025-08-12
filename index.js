const express = require('express');
const app = express();
require('./db');
const User = require('./users');
const cors = require("cors");
app.use(cors());
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("Hello world");
});

app.post("/save", async (req, res) => {
    try {
        let { regno, name, marks } = req.body;
        let user = new User();
        user.regno = regno;
        user.name = name;
        user.marks = marks;
        user = await user.save();
        res.status(200).send({ data: user });
    } catch (err) {
        console.log(err);
        res.status(500).send("Some Error");
    }
})

app.listen(4000, () => {
    console.log("server started and again");
})