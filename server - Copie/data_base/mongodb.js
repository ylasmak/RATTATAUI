(function (database) {

    var MongoClient = require('mongodb').MongoClient;
    var mongoose = require('mongoose');


    function MongoDb(url) {
        this.url = url;
    }

    MongoDb.prototype.insert = function (collection, object) {


        mongoose.connect(this.url);

        MongoClient.connect(this.url, function (err, db) {
            if (err) {
                return console.log(err);
            }

            db.collection(collection).insertOne(object, function (err, inserted) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(inserted);
                }

            });

        });

    };

    MongoDb.prototype.where = function (collection, object) {

        MongoClient.connect(this.url, function (err, db) {
            if (err) {
                return console.log(err);
            }

            db.collection(collection).findOne(object, function (err, document) {
                if (err) {
                    console.log(err);
                } else {
                    return document;
                }

            });

        });


    };
})(module.exports);
