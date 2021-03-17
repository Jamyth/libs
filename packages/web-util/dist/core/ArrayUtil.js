"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUtil = void 0;
const sum = (numbers) => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
};
const sumByKey = (array, key) => {
    let sum = 0;
    array.forEach((_) => (sum += Number(_[key]) ?? 0));
    return sum;
};
const toggleElement = (array, element) => {
    const index = array.indexOf(element);
    if (index >= 0) {
        const cloned = [...array];
        cloned.splice(index, 1);
        return cloned;
    }
    else {
        return [...array, element];
    }
};
const areSame = (a, b, compareOrdering = false) => {
    if (a.length !== b.length) {
        return false;
    }
    if (compareOrdering) {
        return a.every((_, index) => b[index] === _);
    }
    else {
        return a.every((_) => b.includes(_)) && b.every((_) => a.includes(_));
    }
};
const hasIntersection = (a, b) => {
    return a.some((_) => b.includes(_));
};
const toObject = (array, mapperCallback) => {
    const result = {};
    array.forEach((_, i) => {
        const mappedKV = mapperCallback(_, i);
        result[mappedKV[0]] = mappedKV[1];
    });
    return result;
};
exports.ArrayUtil = Object.freeze({
    sum,
    sumByKey,
    toggleElement,
    areSame,
    hasIntersection,
    toObject,
});
