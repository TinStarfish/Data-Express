var express = require('express');
var pug = require('pug');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./public/user.js');
var session= require('express-session');


var usernameTest = "Bob";
var emailTest = "bob@gmail.com";
var passwordTest = "password123";
var ageTest = 45;
var pokemonTest = "Charmander";
var personTypeTest = 0;
var eyeColorTest = "Blue";


var db = mongoose.connect('mongodb://localhost/test');

// var Bob = new user ({
//     username : usernameTest,
//     password : passwordTest,
//     email : emailTest,
//     age : ageTest,
//     pokemon : pokemonTest,
//     type : personTypeTest,
//     eyes : eyeColorTest
// });

// Bob.save(function(error) {
//    console.log("User has been saved.");

//     if(error) {
//         console.error(error);
        
//     }
    
// });



var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.urlencoded({exteded: false}));
app.use(bodyParser.json());
app.use(session({
    secret: "metabones was here",
    resave: true,
    saveUninitialized: false
}));

app.get('/', function (req, res) {
    res.render('title', {
        'title':'Title',
        'data':User
    });    
});

app.get('/signup', function (req, res, next) {
    res.render('signup', {
        'title':'Sign Up'
    });    
});

app.post('/signup', function (req, res, next) {
    console.log(req.body);
    if (req.body.name &&
        req.body.email &&
        req.body.pw &&
        req.body.pw2) {
            if (req.body.pw !== req.body.pw2){
                var error = new Error('Passwords do not match.');
                error.status = 400;
                return next(error);
            }

            var userData = {
                username : req.body.name,
                password : req.body.pw,
                email : req.body.email,
                age : req.body.age,
                pokemon : req.body.pokemon,
                type : req.body.catDog,
                eyes : req.body.color
            };

            User.create(userData, function (error, user){
                if(error) {
                    return next(error);
                } else {
                    req.session.userID = user._id;
                    return res.redirect('/index')
                }
            })

        } else {
            var error = new Error('All Fields Required.');
            error.status = 400;
            return next(error);
        }
})

app.get('/login', function (req, res, next) {
    res.render('login', {
        'title':'Log In'
    });    
});

app.post('/login', function (req, res, next) {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function(error, user) {
            if (error || !user) {
                var err = new Error('Wrong Email or Password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userID = user._id;
                return res.redirect('/index');
            }
        });
    } else {
        var error = new Error('Email and Password are required.');
        error.status = 401;
        return next(error);
    }
});

app.get('/edit', function (req, res) {
    res.render('edit', {
        'title':'Edit'
    });    
});

app.get('/index', function (req, res, next) {
    if (! req.session.userID) {
        var error = new Error("You're Not Logged In Bud.");
        error.status = 403;
        return next(error);
    }
    User.findById(req.session.userID)
    .exec(function(error, user) {
        if (error) {
            return next(error);
        } else {
            return res.render('index', {title: 'Profile', name: user.username});
        }
    })
});

app.get('/userCreated', function (req, res) {
    res.render('userCreated', {
        'title':'User Created'
    });    
});


app.listen(8000);   