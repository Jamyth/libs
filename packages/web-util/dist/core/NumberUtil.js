"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberUtil = void 0;
const clamp = (value, min, max) => {
    if (min > max) {
        throw new Error(`[NumberUtil]: NumberUtil.clamp min(${min}) must be <= max(${max})`);
    }
    return Math.max(min, Math.min(max, value));
};
const max = (list) => {
    return Math.max(...list.map((_) => (_ === undefined || _ === null ? -Infinity : _)));
};
const min = (list) => {
    return Math.min(...list.map((_) => (_ === undefined || _ === null ? Infinity : _)));
};
const formatWithComma = (value) => {
    if (value !== null && Number.isFinite(value)) {
        const parts = value.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    else {
        return "-";
    }
};
exports.NumberUtil = Object.freeze({
    clamp,
    max,
    min,
    formatWithComma,
});
//# sourceMappingURL=NumberUtil.js.map