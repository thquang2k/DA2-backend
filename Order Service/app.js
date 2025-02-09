var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')


var app = express();

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
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var vnpRouter = require('./routes/vnp');
app.use('/vnp', vnpRouter);
var orderRoute = require('./routes/orders');
app.use('/orders', orderRoute);
var couponRoute = require('./routes/coupons');
app.use('/coupons', couponRoute);
var transactionRoute = require('./routes/transactions');
app.use('/transactions', transactionRoute);

module.exports = app;
