'use strict';

var GrovePi          = require('node-grovepi').GrovePi;
var Board            = GrovePi.board;
var DHTDigitalSensor = GrovePi.sensors.DHTDigital;
var pinID            = 2;  // D2 ピン
var deviceID         = DHTDigitalSensor.VERSION.DHT22;
var unit             = DHTDigitalSensor.CELSIUS;

var board = new Board({
    onInit: function(res) {
        if (res) { return; }

        var tempHumidity   = new DHTDigitalSensor(pinID, deviceID, unit);
        setInterval(function(){
            var arr = tempHumidity.read();
            console.log('temperature:', arr[0], 'humidity:', arr[1]);
        }, 2000);
    },
    debug: true,
    onError: function(err) {
        console.log(err)
    }
});

board.init();
