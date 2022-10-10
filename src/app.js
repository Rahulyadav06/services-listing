const express = require('express');
const path = require('path');
require('./db/conn');
const User = require('./models/usermsg');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const app = express();

const staticPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.use('/css',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'../node_modules/bootstrap/dist/js')));
app.use('/jq',express.static(path.join(__dirname,'../node_modules/jquery/dist')));

app.use(express.static(staticPath));
app.use(express.urlencoded({extended:false}));

app.set('view engine','hbs');
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

app.get("/",(req,res)=>{
    res.render('index');
})
app.post("/contact",async (req,res)=>{
    try{
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }
    catch(err){
        res.status(500).send();
    }
});

app.listen(port,()=>{
    console.log("Listening at no",port);
});