'use strict';

function StateMachine(config) {
    config = config || {};
    this.threshold = config.threshold || 100;
    this.margin    = config.margin    || 50;
    this.previousState = 'OK';
    this.currentState  = 'OK';

    /*
     *  通知不要          ：null
     *  水やり必要通知    ：'NG'
     *  水やり実施済み通知：'OK'
     */
    this.notification = null;
}

StateMachine.prototype._isMoistureOK = function (data) {
    // NG -> OK の遷移条件にマージンを加味する
    if (this.previousState === 'NG') {
        return (data > this.threshold + this.margin);
    }
    return (data > this.threshold);
};

StateMachine.prototype.updateState = function (data) {
    this.previousState = this.currentState;
    this.currentState  = this._isMoistureOK(data) ? 'OK' : 'NG';

    if (this.previousState === this.currentState) {
        this.notification = null;
    } else {
        this.notification = this.currentState;
    }
};

module.exports = StateMachine;
