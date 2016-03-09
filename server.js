const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(require('morgan')('short'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.raw({ type: 'multipart/form-data' }));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

(function initWebpack() {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack/common.config');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));

    app.use(express.static(__dirname + '/'));

    app.use(function(req, res, next) {
        next();
    });
})();

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

app.get(/.*/, function root(req, res) {
    res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
    const address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
});
