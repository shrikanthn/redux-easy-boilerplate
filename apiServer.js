const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DBUtils = require('./src/utils/DBUtils');
const dbObj = new DBUtils();


app.use(require('morgan')('short'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/dev*/', function root(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1, b: 2 }));
});

app.post('/api', function root(req, res) {
    res.setHeader('Content-Type', 'plain/text');
    console.log(req.body);
    if (req.body.text) {
        // res.send(" > " + new Date().getTime() + " - " + req.body.text);
        res.send("Hello, " + req.body.text);
    } else {
        res.send(new Date());
    }
});

app.get('/api/getAllAnswers/', function root(req, res) {
    res.setHeader('Content-Type', 'plain/text');
    
    dbObj.getAllSurveyResults();
});

app.post('/postCSV', function root(req, res) {

    if (req.body.text) {


        var parse = require('csv-parse');
        // require('should');

        
        var input = '#Welcome\n"1","2","3","4"\n"a","b","c","d"';
        parse(req.body.text, {comment: '#', delimiter: '\t'}, function(err, output){
            console.log(output);
            
            res.setHeader('Content-Type', 'application/json');
            res.send(output);
          // output.should.eql([ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ]);
        });


    } else {
        res.send(new Date());
    }
});

app.get(/.*/, function root(req, res) {
	res.setHeader('Content-Type', 'plain/text');
    res.send('Hello World!');
});

const server = http.createServer(app);
server.listen(9999, function onListen() {
    const address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
});
