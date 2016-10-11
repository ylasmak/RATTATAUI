var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var parse = require('csv-parse');

var dmn = require('./Model/domaine_analysis');

var router = express.Router();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
var upload = multer({
    dest: './uploads/'
});
//middle ware that is specific to this router



router.get('/', function(req, res) {

    res.render('pages/index.ejs');
});

router.get('/AddNewDomaine', function(req, res) {
    res.render('pages/newAnalysis.ejs');
});


router.post('/PostAddNewDomaine', upload.single('lexiconDataBase'), function(req, res) {

    console.log('------------');
    console.log(req.body) // form fields
    console.log(req.file)

    if (req.file) {

        fs.readFile("./uploads/" + req.file.filename, 'utf8', function(err, data) {
            if (err) throw err;

            parse(data, {
                columns: true
            }, function(err, output) {
                if (err) console.log(err);
                console.log("--end parssing CSV --");
                console.log(output.length);

                output.forEach(function(line) {
                    console.log(line);
                });


                var domaine = dmn({
                    domaine_name: req.body.domaineName,
                    domaine_language: req.body.domaineLanguage,
                    domaine_trainingScript: req.body.trainingScript,
                    domaine_lexicon_data_base: output,
                    created_at: Date.now()
                });


                domaine.save(function(err) {
                    if (err)
                        console.log(err);
                });

            });

        })
    }

    res.writeHead(302, {
        'Location': './edit_domaine'

    });
    res.end();

});

router.get("/edit_domaine", function(req, res)

    {
        res.render('pages/edit_domaine.ejs');
    }
);

module.exports = router;