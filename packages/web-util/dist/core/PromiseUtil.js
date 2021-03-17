"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseUtil = void 0;
const raceSuccess = (promises) => {
    const reversedPromises = promises.map((_) => _.then((val) => Promise.reject(val), (err) => Promise.resolve(err)));
    return Promise.all(reversedPromises).then((errors) => Promise.reject(errors), (val) => Promise.resolve(val));
};
exports.PromiseUtil = Object.freeze({
    raceSuccess,
});
