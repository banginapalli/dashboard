var express = require('express'),
    stylus = require('stylus'),
    reachdata = require('./routes/apiroutes');

var app = express();

function compile(str, path){
    return stylus(str).set('filename', path)
};

app.configure(function(){
    app.set('views', __dirname +  '/server/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(stylus.middleware(
        {
            src: __dirname + '/public',
            compile: compile

        }
    ));
    app.use(express.static(__dirname + '/public'));
});

app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath)
});

app.get('/', function(req, res){
    res.render('index');
});

app.get('/reachdata/:reachdate',reachdata.findByDate);

var port = process.env.PORT || 3030;

app.listen(port);

console.log("Listening on port " + port + "...");

