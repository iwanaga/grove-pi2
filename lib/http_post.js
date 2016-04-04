'use strict';

var http = require('https');

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
    req.write(body);
    req.end();
}

module.exports = post;
