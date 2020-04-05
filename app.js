require('dotenv').config();
const express = require('express')
path = require('path')
index = require('./routes/index')
covid = require('./routes/covid')
logger = require('morgan');
const bodyParser = require("body-parser");

// setup express to use
const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: true
}));

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')))

// handle http to https redirect excluding healthcheck
app.use((req, res, next) => {
    const xfp = req.headers["x-forwarded-proto"] || "";
    if (xfp === "http" && req.url !== "/healthcheck") {
        res.redirect(301, 'https://' + req.headers.host + req.url);
    } else {
        next();
    }
});

// routes
app.use('/', index);
app.use('/covid', covid);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        status: err.status,
        message: err.message + " \n Redirecting to home page..!!"
    });
});

module.exports = app;