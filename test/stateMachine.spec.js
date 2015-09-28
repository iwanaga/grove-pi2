'use strict';

var StateMachine = require('../lib/stateMachine');
var assert       = require('assert');

var OKData = 900;
var NGData = 90;

function OKtoNG() {
    var stateMachine = new StateMachine();
    stateMachine.updateState(NGData);
    assert.strictEqual(stateMachine.notification, 'NG');
}

function NGtoOK() {
    var stateMachine = new StateMachine();
    stateMachine.updateState(NGData);
    stateMachine.updateState(OKData);
    assert.strictEqual(stateMachine.notification, 'OK');
}

function OKtoOK() {
    var stateMachine = new StateMachine();
    stateMachine.updateState(OKData);
    stateMachine.updateState(OKData);
    assert.strictEqual(stateMachine.notification, null);
}

function NGtoNG() {
    var stateMachine = new StateMachine();
    stateMachine.updateState(OKData);
    stateMachine.updateState(OKData);
    assert.strictEqual(stateMachine.notification, null);
}

(function () {
    OKtoNG();
    NGtoOK();
    OKtoOK();
    NGtoNG();
})();
