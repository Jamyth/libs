"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomUtil = void 0;
const fromArray = (array) => {
    const length = array.length;
    return length > 0 ? array[Math.floor(Math.random() * length)] : null;
};
const integerBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.RandomUtil = Object.freeze({
    fromArray,
    integerBetween,
});
