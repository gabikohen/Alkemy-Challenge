
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


/// Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
  definition:{
    openapi:"3.0.0",
    info:{
      title: "Alkemy Challenge APIKEY ",
      version: "1.0.0",
    },
    servers:[{
      url: "http://localhost:4500"
    }]
  },
  apis:[`${path.join(__dirname,"/src/routes/*.js")}`],
}

const moviesRouter = require('./src/routes/movies');
 const usersRouter = require('./src/routes/users'); 
const characterRouter = require('./src/routes/characters')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api-doc", swaggerUI.serve,swaggerUI.setup(swaggerJsDoc(swaggerSpec)))


app.use('/', moviesRouter);
 app.use('/', usersRouter); 
app.use('/', characterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
