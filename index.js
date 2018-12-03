var express = require('express');
var pug = require('pug');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
//var config = require('./config.json');


var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + "/public")));

app.get('/', function (req, res) {
    res.render('index', {
        'title':'Home'
    });    
});


app.listen(3000);