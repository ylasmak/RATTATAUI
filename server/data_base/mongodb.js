var MongoClient = require('mongodb').MongoClient;


function MongoDb() {

    this.url = require("./database_configuration");
    console.log(this.url);
}

MongoDb.prototype.insertMany = function(collection, object) {


    console.log('insertMany');
    MongoClient.connect(this.url, function(err, db) {
        if (err) {
            /// error = err;
            return console.log(err);
        }

        db.collection(collection).insertMany(object, function(err, inserted) {
            if (err) {
                console.log(err);
            } else {
                console.log('inserted');
            }

        });

    });

};

MongoDb.prototype.where = function(collection, object) {

    MongoClient.connect(this.url, function(err, db) {
        if (err) {
            return console.log(err);
        }

        db.collection(collection).findOne(object, function(err, document) {
            if (err) {
                console.log(err);
            } else {
                return document;
            }

        });

    });


};

MongoDb.prototype.pagination = function(collection, filter, skip, limit,callback) {

    MongoClient.connect(this.url, function(err, db) {
        if (err) {
            return console.log(err);
        }

          
        var options = {
            "limit": limit,
            "skip": skip,

        }
        
        
      console.log(collection)
        db.collection(collection).find(filter, options).toArray(function(err, docs) {
            
           callback(err,docs) ;
        });

       
    });
};


module.exports = MongoDb;