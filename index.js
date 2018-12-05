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
    res.render('index', {
        'title':'Home'
    });    
});


app.listen(3000);   