"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearStore = exports.useMaru = exports.useMaruInitialization = void 0;
var react_1 = require("react");
var store = {};
var useMaruInitialization = function (initialData) {
    react_1.useEffect(function () {
        Object.keys(initialData).forEach(function (key) {
            store[key] = { value: initialData[key], triggers: {} };
        });
    }, []);
};
exports.useMaruInitialization = useMaruInitialization;
var useMaru = function (key) {
    var id = react_1.useState(Math.floor(Math.random() * 100000000000).toString())[0];
    var _a = react_1.useState(false), shouldUpdate = _a[0], setShouldUpdate = _a[1];
    react_1.useEffect(function () {
        if (shouldUpdate) {
            setShouldUpdate(false);
        }
    }, [shouldUpdate]);
    react_1.useEffect(function () {
        return function () {
            delete store[key].triggers[id];
        };
    }, [key, id]);
    if (!store[key]) {
        throw "The state for key '" + key + "' has not been initialized.";
    }
    var maru = store[key];
    if (!maru.triggers[id]) {
        maru.triggers[id] = function () {
            setShouldUpdate(true);
        };
    }
    var setMaruState = react_1.useCallback(function (value) {
        maru.value = value;
        var triggers = maru.triggers;
        Object.keys(triggers).forEach(function (triggerId) { return triggers[triggerId](); });
    }, [maru]);
    return [maru.value, setMaruState];
};
exports.useMaru = useMaru;
// for testing purpose
var clearStore = function () {
    Object.keys(store).forEach(function (key) { return delete store[key]; });
};
exports.clearStore = clearStore;
