var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var routingRouter = require('./routes/routing.Routes');
var indexRouter = require('./routes/indexRoutes');

var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({
    secret: 'ssss',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routingRouter);
app.use('/api', indexRouter);

var usersModel = require('./models/usersModel');
passport.use(new LocalStrategy(usersModel.authenticate()));
passport.serializeUser(usersModel.serializeUser());
passport.deserializeUser(usersModel.deserializeUser());
mongoose.connect('mongodb://localhost/my_market', { useNewUrlParser: true });

module.exports = app;
