"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumUtil = void 0;
const toRecord = (enumMap, mapperCallback) => {
    const result = {};
    toArray(enumMap).forEach((item) => (result[item] = mapperCallback(item)));
    return result;
};
const toArray = (enumMap) => {
    return Object.values(enumMap);
};
const fromValue = (enumMap, value) => {
    if (Object.values(enumMap).includes(value)) {
        return value;
    }
    return null;
};
exports.EnumUtil = Object.freeze({
    toRecord,
    toArray,
    fromValue,
});
//# sourceMappingURL=EnumUtil.js.map