'use strict';

var GrovePi = require('node-grovepi').GrovePi;
var Board = GrovePi.board;
var AnalogSensor = GrovePi.sensors.base.Analog;
var TempHumidity = GrovePi.sensors.DHTDigital;

var board = new Board({
    debug: true,
    onError: function(err) {
        console.log(err)
    },
    onInit: function(res) {
        if (res) {
            console.log('connected to GrovePi');

            var humiditySensor = new AnalogSensor('A0');
            var tempHumidity   = new TempHumidity('D2', 'DHT22', 'c');
            console.log('start reading');
            setInterval(function(){
                var value = humiditySensor.read();
                console.log('moisture', value);

                var arr = tempHumidity.read();
                console.log('temperature:', arr[0], 'humidity:', arr[1], 'heat index:', arr[2]);
            }, 1000);
        }
    }
});

board.init();
