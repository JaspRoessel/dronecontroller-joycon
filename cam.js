var arDrone = require('ar-drone');
var http = require('http');
console.log('Connecting png stream ...');
var cl = arDrone.createClient()
var pngStream = cl.getPngStream();
var lastPng;
pngStream.on('error', console.log).on('data', function(pngBuffer) {
    lastPng = pngBuffer
});
var server = http.createServer(function(req, res) {
    if (!lastPng) {
        res.writeHead(503);
        res.end('peop');
        return
    }
    res.writeHead(200, {
        'Content-Type': 'image\png'
    });
    res.end(lastPng)
});
server.listen(8080, function() {
    console.log('bruh ga eens naar localhost:8080 ...')
});

// ga naar "localhost:8080" in je browser
