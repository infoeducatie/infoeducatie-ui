var fs = require('fs');
var gzippo = require('gzippo');
var logger = require('morgan');
var express = require('express');

var app = express();
var basePath = __dirname + "/build";

app.use('*', function(req, res) {
    var filename = req.originalUrl.split("?")[0]

    if (!fs.existsSync(basePath + filename))
        filename = "/index.html";

    res.sendFile(basePath + filename);
});

app.use(logger('combined'));
app.use(gzippo.staticGzip(basePath));
app.listen(process.env.PORT || 5000);
