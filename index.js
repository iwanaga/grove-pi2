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
            console.log('connected to GrovePi');

            var humiditySensor = new AnalogSensor('A0');
            console.log('start reading');
            setInterval(function(){
                var value = humiditySensor.read();
                console.log(value);
            }, 1000);
        }
    }
});

board.init();
