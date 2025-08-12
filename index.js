const express = require('express');
const app = express();
require('./db');
const User = require('./users');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.status(200).send("Hello world");
});

app.put("/save", async (req,res)=>{
    try{
        // let user = new User();
        const arr =  req.body;
        arr.map(async(obj)=>{
            let user = new User();
            user.regno = obj.regno;
            user.name = obj.name;
            user.marks = obj.marks;
            user = await user.save();
        });
        res.status(200).send({data: arr});
    } catch(err) {
        console.log(err);
        res.status(500).send("Some Error");
    }
})

app.listen(4000, ()=>{
    console.log("server started and again");
})