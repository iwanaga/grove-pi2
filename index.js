'use strict';

var HI = require('heat-index');
var post = require('./lib/http_post');
var GrovePi = require('node-grovepi').GrovePi;
var Board = GrovePi.board;
var DHTDigitalSensor = GrovePi.sensors.DHTDigital;

var board = new Board({
    debug: true,
    onError: function(err) {
        console.log(err)
    },
    onInit: function(res) {
        if (res) {
            var tempHumidity = new DHTDigitalSensor(2, DHTDigitalSensor.VERSION.DHT22, DHTDigitalSensor.CELSIUS);
            setInterval(function(){
                var arr = tempHumidity.read();
                post({
                    temperature: arr[0],
                    humidity: arr[1],
                    heatIndex: HI.heatIndex({temperature: arr[0], humidity: arr[1]})
                });
            }, 10000);
        }
    }
});

board.init();
