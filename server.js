const express = require('express'),
      app = express(),
      promClient = require('prom-client'),
      server = require('http').createServer(app);

let port = process.env.PORT || 3030;

const hellosProvided = new promClient.Counter({ name: 'hellos_provided', help: 'Number of Hello Worlds provided to our users.' });

app.get('/', function (req, res) {
    hellosProvided.inc();
    res.send('Hello World!');
});

app.get('/metrics', (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(promClient.register.metrics());
});

server.listen(port);
console.log('location server listening on port: ' + port);

module.exports = server;
