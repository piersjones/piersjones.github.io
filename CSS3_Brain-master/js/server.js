// Module dependencies.
var express = require('express');
var app = express.createServer();

app.configure(function(){

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static('../'));

    //app.set("view options", {layout: false});

});


//render index.html
app.get('/', function(req, res){

    res.render('index.html');

});

console.log('Listening on Port: 8000');

app.listen(8000);
