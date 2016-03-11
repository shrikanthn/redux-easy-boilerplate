import { DBUtils } from './src/utils/DBUtils';

const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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

app.get('/api/getAllSurveyResults', function root(req, res) {
    dbObj.getAllSurveyResults(res);
});
app.get('/api/getAllSurveyCount', function root(req, res) {
    dbObj.getAllSurveyCount(res);
});
app.get('/api/getTeamAverages', function root(req, res) {
    dbObj.getTeamAverages(res);
});
app.get('/api/getSurveyResultsByDate', function root(req, res) {
    if (!!req.query && !!req.query.sprint_date) {
        dbObj.getSurveyResultsByDate(req.query.sprint_date, res);
    }
});
app.post('/api/cleanSurveyByDate', function root(req, res) {
    if (!!req.query && !!req.query.sprint_date) {
        dbObj.cleanSurveyResultsByDate(req.query.sprint_date, res);
    }
});
app.post('/api/postCSV', function root(req, res) {

    let parsedData = [];

    if (req.body.text) {

        let parse = require('csv-parse');
        parse(req.body.text, {comment: '#', delimiter: '\t' }, function(err, output){
            console.log(output);
            dbObj.insertSurveyAnswers(output, res);
        });
    }
    else {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send('Nothig to save!');
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
