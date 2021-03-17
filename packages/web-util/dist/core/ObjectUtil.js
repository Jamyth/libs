"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUtil = void 0;
const firstKey = (object) => {
    const keys = Object.keys(object);
    return keys.length > 0 ? keys[0] : null;
};
const safeAssign = (object, updateFields) => {
    if (object) {
        return Object.assign(object, updateFields);
    }
    else {
        return object;
    }
};
const toObject = (object, mapperCallback) => {
    const newObject = {};
    Object.keys(object).forEach((key, index) => {
        if (object[key] !== undefined) {
            const mappedValue = mapperCallback(key, object[key], index);
            newObject[key] = mappedValue;
        }
    });
    return newObject;
};
const toArray = (object, mapperCallback) => {
    const result = [];
    Object.keys(object).forEach((key, index) => object[key] !== undefined &&
        result.push(mapperCallback(key, object[key], index)));
    return result;
};
const forEach = (object, forEachCallback) => {
    Object.keys(object).forEach((key, index) => object[key] !== undefined &&
        forEachCallback(key, object[key], index));
};
const findKey = (object, value) => {
    let matchedKey = null;
    forEach(object, (key) => {
        if (object[key] === value) {
            matchedKey = key;
        }
    });
    return matchedKey;
};
const sortByKeys = (object, priorityList) => {
    const objectKeys = Object.keys(object);
    objectKeys.sort((a, b) => {
        const aIndex = priorityList.indexOf(a);
        const bIndex = priorityList.indexOf(b);
        if (aIndex < 0 && bIndex < 0) {
            return 0;
        }
        else if (aIndex < 0) {
            // b should be before a
            return 1;
        }
        else if (bIndex < 0) {
            // a should be before b
            return -1;
        }
        else {
            return aIndex - bIndex;
        }
    });
    const obj = {};
    objectKeys.forEach((_) => (obj[_] = object[_]));
    return obj;
};
const isEmpty = (object) => {
    return Object.keys(object).length === 0;
};
exports.ObjectUtil = Object.freeze({
    firstKey,
    safeAssign,
    toObject,
    toArray,
    forEach,
    isEmpty,
    findKey,
    sortByKeys,
});
