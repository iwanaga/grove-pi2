'use strict';

var http = require('http');

function onError(e) {
    console.log('error:', e.message);
}

function post(reqObj, conf, path) {
    var body = JSON.stringify(reqObj);
    var options = {
        hostname: conf.hostname,
        port: conf.port,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length
        }
    };

    var req = http.request(options);
    req.on('error', onError);
    req.writable(body);
    req.end();
}

module.exports = post;