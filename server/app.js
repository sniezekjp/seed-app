var path = require('path');
var fs = require('fs');
var express = require('express');
var serve = require('serve-static');
var body = require('body-parser');
var app = express();

app.use(serve(path.join(__dirname,'../','client')));
app.use(body.json());

app.get('*', function(req, res) {
  res.json({
    success: true
  });
});

app.post("*", function(req, res) {
  res.json(req.body);
});

app.listen(3000);
console.log('3000');