'use strict';

var Mailgun = require('mailgun-js');

function Notifier(conf){
    this.auth = {
        apiKey : conf.apiKey,
        domain : conf.domain
    };
    this.mailData = {
        from       : conf.from,
        to         : conf.to,
        subject    : conf.subject,
        text       : ''
    };
    this.okMessage = conf.okMessage;
    this.ngMessage = conf.ngMessage;

    this.mailer = new Mailgun(this.auth).messages();
}

Notifier.prototype.sendMail = function (message) {
    this.mailData.text = message;
    this.mailer.send(this.mailData, function(err, body){
        if (err) {
            console.log(err);
            return;
        }
        console.log('mail sent', body);
    });
};

Notifier.prototype.notifyOK = function() {
    this.sendMail(this.okMessage);
};

Notifier.prototype.notifyNG = function() {
    this.sendMail(this.ngMessage);
};

module.exports = Notifier;
