var express = require('express');
var students = require('./controllers/students.js');

var app=express();
app.set('view engine','ejs');//setup template engine

app.use('/assets',express.static('stuff'));//middleware for static files

students(app);

app.listen(3000,function(err){
  if(err)
    throw err;
});
