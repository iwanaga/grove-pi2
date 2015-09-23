'use strict';

var GrovePi = require('node-grovepi').GrovePi;
var Board = GrovePi.board;
var AnalogSensor = GrovePi.sensors.base.Analog;
var DHTDigitalSensor = GrovePi.sensors.DHTDigital;
var HI = require('heat-index');

var board = new Board({
    debug: true,
    onError: function(err) {
        console.log(err)
    },
    onInit: function(res) {
        if (res) {
            console.log('connected to GrovePi');

            var humiditySensor = new AnalogSensor('A0');
            var tempHumidity   = new DHTDigitalSensor(2, DHTDigitalSensor.VERSION.DHT22, DHTDigitalSensor.CELSIUS);
            console.log('start reading');
            setInterval(function(){
                var value = humiditySensor.read();
                console.log('moisture', value);

                var arr = tempHumidity.read();
                console.log('temperature:', arr[0], 'humidity:', arr[1], 'heat index:', HI.heatIndex({temperature: arr[0], humidity: arr[1]}));
            }, 1000);
        }
    }
});

board.init();
