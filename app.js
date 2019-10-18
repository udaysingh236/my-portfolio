require('dotenv').config();
const express   = require('express')
    path        = require('path')
    index       = require('./routes/index')
    logger      = require('morgan');

// setup express to use
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public'))) 

// routes
app.use('/', index);

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
    res.render('error', {status:err.status, message:err.message});
});

module.exports = app;