var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/public/uploads'));
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
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
var brandRouter = require('./routes/brands');
app.use('/brands', brandRouter);
var categoryRouter = require('./routes/categories');
app.use('/categories', categoryRouter);
var colorRouter = require('./routes/colors');
app.use('/colors', colorRouter);
var originRouter = require('./routes/origins');
app.use('/origins', originRouter);
var promtionRouter = require('./routes/promotions');
app.use('/promotions', promtionRouter);
var productRouter = require('./routes/products');
app.use('/products', productRouter);
var uploadRouter = require('./routes/upload');
app.use('/uploads', uploadRouter);
var cartRouter = require('./routes/cart');
app.use('/cart', cartRouter);

module.exports = app;
