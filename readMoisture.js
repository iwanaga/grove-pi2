'use strict';

var GrovePi      = require('node-grovepi').GrovePi;
var Board        = GrovePi.board;
var AnalogSensor = GrovePi.sensors.base.Analog;
var pinID        = 'A0';

var board = new Board({
    onInit: function(res) {
        if (res) { return; }

        var humiditySensor = new AnalogSensor(pinID);
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
