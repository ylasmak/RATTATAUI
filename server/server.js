var express = require('express');
var app = express();
 
app.use(express.static(__dirname + '/public'));
 
//Routes
app.use(require('./routes'));
 
//app.use("/user",require('./routes'));  //http://127.0.0.1:8000/user  http://127.0.0.1:8000/user/about
 
 
var server = app.listen(8081, function () {
 
    var host = server.address().address
    var port = server.address().port
 
    console.log("Server started.. (listening at http://%s:%s)", host, port)
 
})