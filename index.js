var emitStream = require('emit-stream');
var JSONStream = require('JSONStream');
var net = require('net');
var EventEmitter = require('events').EventEmitter;


var server = (function () {
    var ev = createEmitter();

    return net.createServer(function (stream) {
        emitStream(ev)
            .pipe(JSONStream.stringify())
            .pipe(stream)
        ;
    });
})();

server.listen(5555);


function createEmitter () {
    var ev = new EventEmitter;
    setInterval(function () {
        ev.emit('cmd', {method:'animateLeds', args:['blinkRed',5,2]})
    }, 2000);

    return ev;
}
