var express = require('express');
var pug = require('pug');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

var usernameTest = "Bob";
var emailTest = "bob@gmail.com";
var passwordTest = "password123";
var ageTest = 45;
var pokemonTest = "Charmander";
var personTypeTest = 0;
var eyeColorTest = "Blue";

var db = mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var Users = new Schema ({
    username : String,
    password : String,
    email : String,
    age : Number,
    pokemon : String,
    type : Boolean,
    eyes : String
    
    
});

var user = mongoose.model("User", Users);

var Bob = new user ({
    username : usernameTest,
    password : passwordTest,
    email : emailTest,
    age : ageTest,
    pokemon : pokemonTest,
    type : personTypeTest,
    eyes : eyeColorTest
    
    
});

Bob.save(function(error) {
   console.log("User has been saved.");

    if(error) {
        console.error(error);
        
    }
    
});

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + "/public")));

app.get('/', function (req, res) {
    res.render('title', {
        'title':'Title'
    });    
});

app.get('/signup', function (req, res) {
    res.render('signup', {
        'title':'Sign Up'
    });    
});

app.get('/login', function (req, res) {
    res.render('login', {
        'title':'Log In'
    });    
});

app.get('/edit', function (req, res) {
    res.render('edit', {
        'title':'Edit'
    });    
});

app.get('/mainpage', function (req, res) {
    res.render('mainpage', {
        'title':'Home'
    });    
});

app.get('/userCreated', function (req, res) {
    res.render('userCreated', {
        'title':'User Created'
    });    
});


app.listen(3000);   