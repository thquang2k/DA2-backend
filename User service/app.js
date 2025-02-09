//lib setup
require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors  = require('cors')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
      origin: process.env.FRONT_END_URL || "http://localhost:3000",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
)

const init = require('./init')
init.init()

//route setup
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
const roleRouter = require('./routes/roles');
app.use('/roles', roleRouter);
const addressesRouter = require('./routes/addresses');
app.use('/addresses', addressesRouter)

module.exports = app;
