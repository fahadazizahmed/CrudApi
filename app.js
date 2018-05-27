var express = require('express');
var app = express();
var  bodyParser = require('body-parser')
var Controller = require('./Controller/control');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ApiDatBase');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/api',Controller);


app.use(function(err,req,res,next){
  console.log(err.message)
  res.status(404).send({Error:err.message});
});
app.listen(5600);//if you domiin have live server then 4000 not used we used port.env.fe
console.log('Server running on port 5600');
