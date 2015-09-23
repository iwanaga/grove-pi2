'use strict';

var GrovePi = require('node-grovepi').GrovePi;
var Board = GrovePi.board;
var AnalogSensor = GrovePi.sensors.base.Analog;

var board = new Board({
    debug: true,
    onError: function(err) {
        console.log(err)
    },
    onInit: function(res) {
        if (res) {
            console.log('GrovePi Version :: ' + board.version());

            var humiditySensor = new AnalogSensor('A0');
            console.log('start reading');
            humiditySensor.on('change', function(res) {
                console.log(res);
            });
            humiditySensor.watch(1000);
        }
    }
});

board.init();
