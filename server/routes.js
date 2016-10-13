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

                console.log('----------------end Domaine-----------');

                var domaine = new dmn({
                    domaine_name: req.body.domaineName,
                    domaine_language: req.body.domaineLanguage,
                    domaine_trainingScript: req.body.trainingScript,
                    domaine_lexicon_data_base: output,
                    created_at: Date.now()
                });


                domaine.save(function(err, domaine) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('saving done');
                        console.log(domaine);
                        req.session.domaine = domaine;
                    }
                });


                console.log('saving OK');
                res.writeHead(302, {
                    'Location': './edit_domaine'

                });

            });

        })
    }




});

router.get("/edit_domaine", function(req, res)

    {
        console.log('edit_domaine')
        var text = "Hello word"
        res.render('pages/grid.ejs', {
            tagline: req.session.domaine.domaine_trainingScript
        });
    }
);


router.post('/importTrainingScrip', upload.single('trainingScript'), function(req, res) {

       if (req.file) {
       
        fs.readFile("./uploads/" + req.file.filename, 'utf8', function(err, data) {
            if (err) console.log(err);
            req.session.domaine.domaine_trainingScript = data;
            res.writeHead(302, {
                'Location': './edit_domaine'

            });


        })
    }

});

module.exports = router;