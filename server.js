var http = require("http");
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');



app.use(express.static(__dirname + "/"));
app.get('/',function(req, res) {
    res.sendFile(__dirname + req.url);
    res.send()
});
app.listen(8080)

// Console will print the message
console.log('Server running at http://127.0.0.1:8080/');