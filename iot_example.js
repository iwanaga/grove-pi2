'use strict';

var GrovePi      = require('node-grovepi').GrovePi;
var Board        = GrovePi.board;
var AnalogSensor = GrovePi.sensors.base.Analog;
var pinID        = 'A0';

var StateMachine = require('./stateMachine');
var Notifier     = require('./notifier');
var config = {
    apiKey: 'key-XXX',                 // MailGun の API Key を指定
    domain: 'sandboxXXX.mailgun.org',  // MailGun の Subdomain を指定
    from  : 'XXX@XXX',                 // メール送信元
    ngMessage: '土が乾いたよ。お水をあげてください。',
    okMessage: 'お水ありがとう。'
};

var board = new Board({
    onInit: function(res) {
        if (res) { return; }

        var humiditySensor = new AnalogSensor(pinID);
        var stateMachine   = new StateMachine();
        var notifier       = new Notifier(config);
        setInterval(function(){
            var value = humiditySensor.read();
            stateMachine.updateState(value);
            if (stateMachine.notification === 'OK') {
                notifier.notifyOK();
            } else if (stateMachine.notification === 'NG') {
                notifier.notifyNG();
            }
        }, 1000);
    },
    debug  : true,
    onError: function(err) {
        console.log(err)
    }
});

board.init();
