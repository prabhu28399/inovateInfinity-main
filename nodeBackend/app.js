const express = require('express');
const app = express();
const mongooe = require('mongoose');
const bodyparser= require('body-parser')
const mongoURI='mongodb://localhost:27017/loginData';
const authRouter= require('./routes/auth');
const cors=require('cors');
const bodyParser = require('body-parser');


//middleware
app.use(cors)
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
mongooe.connect(mongoURI)
mongooe.connection.on('open',()=>{
    console.log("database connection established");
});

app.listen(3000,(err)=>{
    if(!err){
        console.log("app is listening");
    }}

)