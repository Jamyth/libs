"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextUtil = void 0;
const truncate = (text, maxLength, suffix = "…") => {
    if (maxLength <= 0 || !Number.isSafeInteger(maxLength)) {
        throw new Error("[TextUtil]: TextUtil.truncate.maxLength must be a positive integer");
    }
    const chars = Array.from(text);
    return chars.length > maxLength
        ? chars.slice(0, maxLength).join("") + suffix
        : text;
};
const splitByLength = (text, charLength, delimiter) => {
    if (!Number.isInteger(charLength) || charLength < 1) {
        throw new Error("[TextUtil]: TextUtil.splitByLength.charLength must be >= 1");
    }
    const matchedResult = text.match(new RegExp(`.{1,${charLength}}`, "g"));
    return matchedResult ? matchedResult.join(delimiter) : text;
};
const interpolate = (text, ...parameters) => {
    let result = text;
    for (let i = 0; i < parameters.length; i++) {
        result = result.replace(`{${i + i}}`, parameters[i]);
    }
    return result;
};
exports.TextUtil = Object.freeze({
    truncate,
    interpolate,
    splitByLength,
});
