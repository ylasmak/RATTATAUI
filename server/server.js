
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  
      res.render('pages/index.ejs');
});

app.get('/AddNewDomaine', function(req, res) {
    res.render('pages/newAnalysis.ejs');
});


app.post('/PostAddNewDomaine',urlencodedParser, function(req, res) {
    
      response = {
          domaineName:req.body.domaineName,
          domaineLanguage:req.body.domaineLanguage,
          trainingScript:req.body.trainingScript,
          lexiconDataBase:req.body.lexiconDataBase,
          
   };
  
   res.render('pages/index.ejs');
    
   
});


app.get('/etage/:etagenum/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
});
app.listen(8081);
// Console will print the message
