var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var multer  = require('multer');

var dmn = require('./Model/domaine_analysis');



//var mongo = require('./data_base/mongodb');

var app = express();
var upload = multer({ dest: '/files/'});
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', function(req, res) {

    res.render('pages/index.ejs');
});

app.get('/AddNewDomaine', function(req, res) {
    res.render('pages/newAnalysis.ejs');
});


app.post('/PostAddNewDomaine',  upload.single('trainingScript'),function(req, res) {

    if(req.files)
        {
            console.log((req.trainingScript));
        }
    console.log(req.files);
    console.log(req.body);
   // console.log("file name", req.files.trainingScript.name);                                           
//    console.log("file path", req.files.trainingScript.path);                                           

    res.end("upload complete");   
    
    var domaine = dmn({
        domaine_name: req.body.domaineName,
        domaine_language: req.body.domaineLanguage,
        domaine_trainingScript: req.body.trainingScript,
        domaine_lexicon_data_base: req.body.lexiconDataBase,
        created_at: Date.now()
    });
   
  
    //domaine.save(function(err) {
    // if(err)
    //    console.log(err);
    //})
    

});


app.get('/etage/:etagenum/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
});
app.listen(8081);
// Console will print the message