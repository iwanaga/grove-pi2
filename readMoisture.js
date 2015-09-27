'use strict';

var GrovePi      = require('node-grovepi').GrovePi;
var Board        = GrovePi.board;
var AnalogSensor = GrovePi.sensors.base.Analog;

var board = new Board({
    onInit: function(res) {
        if (res) { return; }

        var humiditySensor = new AnalogSensor('A0');
        setInterval(function(){
            var value = humiditySensor.read();
            console.log('moisture:', value);
        }, 1000);
    },
    debug  : true,
    onError: function(err) {
        console.log(err)
    }
});

board.init();
