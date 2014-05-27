var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var server;

if (env === 'development') {
    server = new Server('localhost', 27017, {auto_reconnect: true});
}
else {
    new Server('mongodb://vijaya:test@ds029257.mongolab.com:29257/dashboard', {auto_reconnect: true});
}

db = new Db('dashboard', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'dashboard' database");
        db.collection('dashboard', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'dashboard' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.findByDate = function(req, res) {
    var reachdate = req.params.reachdate;
    console.log('Retrieving Reach For Date: ' + reachdate);
    db.collection('dashboard', function(err, collection) {
        collection.findOne({'reachdate':reachdate}, {_id:0, reachdate:0}, function(err, item) {
            res.send(item);
        });
    });
};