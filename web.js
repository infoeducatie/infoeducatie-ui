var gzippo = require('gzippo');
var logger = require('morgan');
var express = require('express');
var app = express();

app.use(logger('combined'));
app.use(gzippo.staticGzip("" + __dirname + "/build"));
app.listen(process.env.PORT || 5000);
