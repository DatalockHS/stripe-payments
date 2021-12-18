const express = require('express');
const app = express();

require("dotenv").config();
const session = require('express-session');

const path = require('path');
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use(session({
    secret: process.env.SECRET,
    cookie:{},
    resave:false,
    saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

if(app.get("env") === "production"){
    session.cookie.secure = true;
}
const port = process.env.PORT || 3005;

app.set('view engine', 'ejs');

app.set('views',path.join(__dirname,'views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

require('./routes/app.routes')(app);



app.listen(port,()=>{
    console.log('Server started on port ' + port);
})