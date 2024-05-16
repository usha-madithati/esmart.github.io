"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateManagerFactory = exports.StateManagerProxy = exports.Html5QrcodeScannerState = void 0;
var Html5QrcodeScannerState;
(function (Html5QrcodeScannerState) {
    Html5QrcodeScannerState[Html5QrcodeScannerState["UNKNOWN"] = 0] = "UNKNOWN";
    Html5QrcodeScannerState[Html5QrcodeScannerState["NOT_STARTED"] = 1] = "NOT_STARTED";
    Html5QrcodeScannerState[Html5QrcodeScannerState["SCANNING"] = 2] = "SCANNING";
    Html5QrcodeScannerState[Html5QrcodeScannerState["PAUSED"] = 3] = "PAUSED";
})(Html5QrcodeScannerState = exports.Html5QrcodeScannerState || (exports.Html5QrcodeScannerState = {}));
var StateManagerImpl = (function () {
    function StateManagerImpl() {
        this.state = Html5QrcodeScannerState.NOT_STARTED;
        this.onGoingTransactionNewState = Html5QrcodeScannerState.UNKNOWN;
    }
    StateManagerImpl.prototype.directTransition = function (newState) {
        this.failIfTransitionOngoing();
        this.validateTransition(newState);
        this.state = newState;
    };
    StateManagerImpl.prototype.startTransition = function (newState) {
        this.failIfTransitionOngoing();
        this.validateTransition(newState);
        this.onGoingTransactionNewState = newState;
        return this;
    };
    StateManagerImpl.prototype.execute = function () {
        if (this.onGoingTransactionNewState
            === Html5QrcodeScannerState.UNKNOWN) {
            throw "Transaction is already cancelled, cannot execute().";
        }
        var tempNewState = this.onGoingTransactionNewState;
        this.onGoingTransactionNewState = Html5QrcodeScannerState.UNKNOWN;
        this.directTransition(tempNewState);
    };
    StateManagerImpl.prototype.cancel = function () {
        if (this.onGoingTransactionNewState
            === Html5QrcodeScannerState.UNKNOWN) {
            throw "Transaction is already cancelled, cannot cancel().";
        }
        this.onGoingTransactionNewState = Html5QrcodeScannerState.UNKNOWN;
    };
    StateManagerImpl.prototype.getState = function () {
        return this.state;
    };
    StateManagerImpl.prototype.failIfTransitionOngoing = function () {
        if (this.onGoingTransactionNewState
            !== Html5QrcodeScannerState.UNKNOWN) {
            throw "Cannot transition to a new state, already under transition";
        }
    };
    StateManagerImpl.prototype.validateTransition = function (newState) {
        switch (this.state) {
            case Html5QrcodeScannerState.UNKNOWN:
                throw "Transition from unknown is not allowed";
            case Html5QrcodeScannerState.NOT_STARTED:
                this.failIfNewStateIs(newState, [Html5QrcodeScannerState.PAUSED]);
                break;
            case Html5QrcodeScannerState.SCANNING:
                break;
            case Html5QrcodeScannerState.PAUSED:
                break;
        }
    };
    StateManagerImpl.prototype.failIfNewStateIs = function (newState, disallowedStatesToTransition) {
        for (var _i = 0, disallowedStatesToTransition_1 = disallowedStatesToTransition; _i < disallowedStatesToTransition_1.length; _i++) {
            var disallowedState = disallowedStatesToTransition_1[_i];
            if (newState === disallowedState) {
                throw "Cannot transition from ".concat(this.state, " to ").concat(newState);
            }
        }
    };
    return StateManagerImpl;
}());
var StateManagerProxy = (function () {
    function StateManagerProxy(stateManager) {
        this.stateManager = stateManager;
    }
    StateManagerProxy.prototype.startTransition = function (newState) {
        return this.stateManager.startTransition(newState);
    };
    StateManagerProxy.prototype.directTransition = function (newState) {
        this.stateManager.directTransition(newState);
    };
    StateManagerProxy.prototype.getState = function () {
        return this.stateManager.getState();
    };
    StateManagerProxy.prototype.canScanFile = function () {
        return this.stateManager.getState() === Html5QrcodeScannerState.NOT_STARTED;
    };
    StateManagerProxy.prototype.isScanning = function () {
        return this.stateManager.getState() !== Html5QrcodeScannerState.NOT_STARTED;
    };
    StateManagerProxy.prototype.isStrictlyScanning = function () {
        return this.stateManager.getState() === Html5QrcodeScannerState.SCANNING;
    };
    StateManagerProxy.prototype.isPaused = function () {
        return this.stateManager.getState() === Html5QrcodeScannerState.PAUSED;
    };
    return StateManagerProxy;
}());
exports.StateManagerProxy = StateManagerProxy;
var StateManagerFactory = (function () {
    function StateManagerFactory() {
    }
    StateManagerFactory.create = function () {
        return new StateManagerProxy(new StateManagerImpl());
    };
    return StateManagerFactory;
}());
exports.StateManagerFactory = StateManagerFactory;
//# sourceMappingURL=state-manager.js.map